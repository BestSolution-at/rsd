import { toString } from 'langium/generate';
import { describe, expect, test } from 'vitest';
import { JavaImportsCollector } from '../../../src/java-gen-utils.js';
import { MResolvedScalarType } from '../../../src/model.js';
import {
	generateDefaultScalarMethods,
	generateScalarMethods,
	generateScalarSupportContent,
	generateSubstituteScalarMethods,
} from '../../../src/java-model-json/scalar-support.js';

function scalar(name: string): MResolvedScalarType {
	return { '@type': 'ScalarType', name, doc: '' };
}

function makeFqn() {
	const collector = new JavaImportsCollector('com.example.test');
	return collector.importType.bind(collector);
}

const BASE_PACKAGE = 'com.example';

const ZoneId_Default = `
public static ZoneId ZoneIdFromJson(String s) {
	return ZoneId.of(s);
}
public static String ZoneIdToJson(ZoneId value) {
	return value.toString();
}`.trim();

const ZoneId_Substitute_Simple = `
public static LocalDate ZoneIdFromJson(String s) {
	return LocalDate.parse(s);
}
public static String ZoneIdToJson(LocalDate value) {
	return value.toString();
}`.trim();

const ZoneId_Substitute_Qualified = `
public static LocalDate ZoneIdFromJson(String s) {
	return Converter.parse(s);
}
public static String ZoneIdToJson(LocalDate value) {
	return Converter.format(value);
}`.trim();

const ScalarSupport_Empty = `
public class _ScalarSupport {
	public static Object toJson(Object value) {
		return value;
	}

}`.trim();

const ScalarSupport_Single = `
public class _ScalarSupport {
	public static Object toJson(Object value) {
		if (value instanceof ZoneId) {
			return ZoneIdToJson((ZoneId) value);
		}
		return value;
	}

	public static ZoneId ZoneIdFromJson(String s) {
		return ZoneId.of(s);
	}
	public static String ZoneIdToJson(ZoneId value) {
		return value.toString();
	}

}`.trim();

const ScalarSupport_Multiple = `
public class _ScalarSupport {
	public static Object toJson(Object value) {
		if (value instanceof ZoneId) {
			return ZoneIdToJson((ZoneId) value);
		}
		if (value instanceof LocalDate) {
			return LocalDateToJson((LocalDate) value);
		}
		return value;
	}

	public static ZoneId ZoneIdFromJson(String s) {
		return ZoneId.of(s);
	}
	public static String ZoneIdToJson(ZoneId value) {
		return value.toString();
	}

	public static LocalDate LocalDateFromJson(String s) {
		return LocalDate.of(s);
	}
	public static String LocalDateToJson(LocalDate value) {
		return value.toString();
	}

}`.trim();

describe('generateDefaultScalarMethods', () => {
	test('generates fromJson and toJson using interface type', () => {
		const fqn = makeFqn();
		const result = toString(generateDefaultScalarMethods(scalar('ZoneId'), BASE_PACKAGE, fqn), '\t').trim();
		expect(result).toBe(ZoneId_Default);
	});

	test('uses scalar name in method signatures', () => {
		const fqn = makeFqn();
		const result = toString(generateDefaultScalarMethods(scalar('LocalDate'), BASE_PACKAGE, fqn), '\t').trim();
		expect(result).toContain('public static LocalDate LocalDateFromJson(String s)');
		expect(result).toContain('public static String LocalDateToJson(LocalDate value)');
		expect(result).toContain('return LocalDate.of(s);');
	});
});

describe('generateSubstituteScalarMethods', () => {
	test('simple fromJson/toJson (no dots) uses type.method() and value.method() forms', () => {
		const fqn = makeFqn();
		const result = toString(
			generateSubstituteScalarMethods(
				scalar('ZoneId'),
				{ type: 'java.time.LocalDate', fromJson: 'parse', toJson: 'toString' },
				fqn,
			),
			'\t',
		).trim();
		expect(result).toBe(ZoneId_Substitute_Simple);
	});

	test('qualified fromJson/toJson (with dots) extracts static utility class and method', () => {
		const fqn = makeFqn();
		const result = toString(
			generateSubstituteScalarMethods(
				scalar('ZoneId'),
				{
					type: 'java.time.LocalDate',
					fromJson: 'com.example.Converter.parse',
					toJson: 'com.example.Converter.format',
				},
				fqn,
			),
			'\t',
		).trim();
		expect(result).toBe(ZoneId_Substitute_Qualified);
	});
});

describe('generateScalarMethods', () => {
	test('with undefined nativeTypeSubstitutes falls back to default methods', () => {
		const fqn = makeFqn();
		const result = toString(generateScalarMethods(scalar('ZoneId'), undefined, BASE_PACKAGE, fqn), '\t').trim();
		expect(result).toBe(ZoneId_Default);
	});

	test('with nativeTypeSubstitutes not matching scalar name falls back to default methods', () => {
		const fqn = makeFqn();
		const result = toString(
			generateScalarMethods(
				scalar('ZoneId'),
				{ LocalDate: { type: 'java.time.LocalDate', fromJson: 'parse', toJson: 'toString' } },
				BASE_PACKAGE,
				fqn,
			),
			'\t',
		).trim();
		expect(result).toBe(ZoneId_Default);
	});

	test('with nativeTypeSubstitutes matching scalar name uses substitute methods', () => {
		const fqn = makeFqn();
		const result = toString(
			generateScalarMethods(
				scalar('ZoneId'),
				{ ZoneId: { type: 'java.time.LocalDate', fromJson: 'parse', toJson: 'toString' } },
				BASE_PACKAGE,
				fqn,
			),
			'\t',
		).trim();
		expect(result).toBe(ZoneId_Substitute_Simple);
	});
});

describe('generateScalarSupportContent', () => {
	test('empty scalar list produces class with no methods', () => {
		const fqn = makeFqn();
		const result = toString(generateScalarSupportContent([], undefined, BASE_PACKAGE, fqn), '\t').trim();
		expect(result).toBe(ScalarSupport_Empty);
	});

	test('single scalar produces class with fromJson and toJson methods', () => {
		const fqn = makeFqn();
		const result = toString(
			generateScalarSupportContent([scalar('ZoneId')], undefined, BASE_PACKAGE, fqn),
			'\t',
		).trim();
		expect(result).toBe(ScalarSupport_Single);
	});

	test('multiple scalars produces class with all scalar methods', () => {
		const fqn = makeFqn();
		const result = toString(
			generateScalarSupportContent([scalar('ZoneId'), scalar('LocalDate')], undefined, BASE_PACKAGE, fqn),
			'\t',
		).trim();
		expect(result).toBe(ScalarSupport_Multiple);
	});

	test('scalar with substitute uses substitute type in generated methods', () => {
		const fqn = makeFqn();
		const substitutes = { ZoneId: { type: 'java.time.LocalDate', fromJson: 'parse', toJson: 'toString' } };
		const result = toString(
			generateScalarSupportContent([scalar('ZoneId')], substitutes, BASE_PACKAGE, fqn),
			'\t',
		).trim();
		expect(result).toContain('public static LocalDate ZoneIdFromJson(String s)');
		expect(result).toContain('return LocalDate.parse(s);');
		expect(result).toContain('return value.toString();');
	});
});
