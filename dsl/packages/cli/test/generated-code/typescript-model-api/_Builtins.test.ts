import { describe, expect, test } from 'vitest';
import {
	RSDOffsetDateTime,
	RSDOffsetDateTimeFromJSON,
	RSDOffsetDateTimeToJSON,
	RSDZonedDateTimeFromJSON,
	RSDZonedDateTimeToJSON,
	RSDLocalDateTimeFromJSON,
	RSDLocalDateTimeToJSON,
	RSDLocalDateToJSON,
	RSDLocalDateFromJSON,
	RSDLocalTimeToJSON,
	RSDLocalTimeFromJSON,
} from '../../test-specs/gen-out/client/typescript-client/src/model/index.js';

describe('RSDZonedDateTime', () => {
	const ZONED_DATE_TIME_1 = Temporal.ZonedDateTime.from('2024-06-01T12:00:00+02:00[Europe/Berlin]');
	const ZONED_DATE_TIME_2 = Temporal.ZonedDateTime.from('2024-06-01T10:00:00Z[UTC]');
	test('fromJSON', () => {
		expect(RSDZonedDateTimeFromJSON('2024-06-01T12:00:00+02:00[Europe/Berlin]')).toStrictEqual(ZONED_DATE_TIME_1);
		expect(RSDZonedDateTimeFromJSON('2024-06-01T10:00:00Z')).toStrictEqual(ZONED_DATE_TIME_2);
	});
	test('toJSON', () => {
		expect(RSDZonedDateTimeToJSON(ZONED_DATE_TIME_1)).toBe('2024-06-01T12:00:00+02:00[Europe/Berlin]');
		expect(RSDZonedDateTimeToJSON(ZONED_DATE_TIME_1.withCalendar('islamic-umalqura'))).toBe(
			'2024-06-01T12:00:00+02:00[Europe/Berlin]',
		);
		expect(RSDZonedDateTimeToJSON(ZONED_DATE_TIME_2)).toBe('2024-06-01T10:00:00Z');
	});
});

describe('RSDOffsetDateTime', () => {
	const ZONED_DATE_TIME_1 = Temporal.ZonedDateTime.from('2024-06-01T12:00:00+02:00[+02:00]');
	test('fromJSON', () => {
		expect(RSDOffsetDateTimeFromJSON('2024-06-01T12:00:00+02:00').zonedDateTime).toStrictEqual(ZONED_DATE_TIME_1);
	});
	test('toJSON', () => {
		expect(RSDOffsetDateTimeToJSON(RSDOffsetDateTime.from('2024-06-01T12:00:00+02:00'))).toBe(
			'2024-06-01T12:00:00+02:00',
		);
	});
});

describe('RSDLocalDateTime', () => {
	const LOCAL_DATE_TIME_1 = Temporal.PlainDateTime.from('2024-06-01T12:00:00');
	test('fromJSON', () => {
		expect(RSDLocalDateTimeFromJSON('2024-06-01T12:00:00')).toStrictEqual(LOCAL_DATE_TIME_1);
	});
	test('toJSON', () => {
		expect(RSDLocalDateTimeToJSON(LOCAL_DATE_TIME_1)).toBe('2024-06-01T12:00:00');
	});
});

describe('RSDLocalDate', () => {
	const LOCAL_DATE_1 = Temporal.PlainDate.from('2024-06-01');
	test('fromJSON', () => {
		expect(RSDLocalDateFromJSON('2024-06-01')).toStrictEqual(LOCAL_DATE_1);
	});
	test('toJSON', () => {
		expect(RSDLocalDateToJSON(LOCAL_DATE_1)).toBe('2024-06-01');
	});
});

describe('RSDLocalTime', () => {
	const LOCAL_TIME_1 = Temporal.PlainTime.from('12:00:00');
	test('fromJSON', () => {
		expect(RSDLocalTimeFromJSON('12:00:00')).toStrictEqual(LOCAL_TIME_1);
		expect(() => RSDLocalTimeFromJSON('24:00:00')).toThrow();
	});
	test('toJSON', () => {
		expect(RSDLocalTimeToJSON(LOCAL_TIME_1)).toBe('12:00:00');
	});
});
