import { CompositeGeneratorNode, NL, toString } from 'langium/generate';
import {
  generateCompilationUnit,
  TypescriptClientAPIGeneratorConfig,
  TypescriptImportCollector,
} from '../typescript-gen-utils.js';

export function generateTypeUtils(config: TypescriptClientAPIGeneratorConfig) {
  const collector = new TypescriptImportCollector(config);
  const fqn = collector.importType.bind(collector);
  return {
    name: `_type-utils.ts`,
    content: toString(
      generateCompilationUnit(collector, generateTypeUtilsContent(fqn)),
      '\t'
    ),
    path: `${config.targetFolder}`,
  };
}

function generateTypeUtilsContent(
  fqn: (t: string, typeOnly: boolean) => string
) {
  const node = new CompositeGeneratorNode();
  node.append(
    singleStatementFunction(
      'export function isDefined<T>(value: T | undefined): value is T',
      'return value !== undefined'
    ),
    NL
  );
  node.append(
    singleStatementFunction(
      'export function isUndefined<T>(value: T | undefined): value is undefined',
      'return value === undefined'
    ),
    NL
  );
  node.append(
    singleStatementFunction(
      'export function isNotNull<T>(value: T | null): value is T',
      'return value !== null'
    ),
    NL
  );
  node.append(
    singleStatementFunction(
      'export function isNull<T>(value: T | null): value is null',
      'return value === null'
    ),
    NL
  );
  node.append(
    singleStatementFunction(
      'export function isValue<T>(value: T | undefined | null): value is T',
      'return isNotNull(value) && isDefined(value)'
    ),
    NL
  );
  node.append(
    singleStatementFunction(
      'export function isBoolean(value: unknown): value is boolean',
      `return typeof value === 'boolean'`
    ),
    NL
  );
  node.append(
    singleStatementFunction(
      'export function isNumber(value: unknown): value is number',
      `return typeof value === 'number'`
    ),
    NL
  );
  node.append(
    singleStatementFunction(
      'export function isArray(value: unknown): value is Array<unknown>',
      'return isNotNull(value) && isDefined(value) && Array.isArray(value)'
    ),
    NL
  );
  node.append(
    singleStatementFunction(
      'export function isRecord(value: unknown): value is Record<string, unknown>',
      `return isNotNull(value) && typeof value === 'object' && !isArray(value)`
    ),
    NL
  );
  node.append(
    singleStatementFunction(
      'export function isString(value: unknown): value is string',
      `return typeof value === 'string'`
    ),
    NL
  );
  node.append(
    singleStatementFunction(
      'export function isStringType<T extends string>(value: unknown, type: T): value is T',
      'return value === type'
    ),
    NL
  );
  node.append(
    singleStatementFunction(
      'export function createIsStringTypeGuard<T extends string>(type: T): (v: unknown) => v is T',
      'return (v) => isStringType(v, type)'
    ),
    NL
  );
  node.append(
    singleStatementFunction(
      'export function createTypedArrayGuard<T>(guard: (v: unknown) => v is T): (v: unknown) => v is T[]',
      'return (v) => isTypedArray(v, guard)'
    ),
    NL
  );
  node.append(isTypedArray(), NL);
  node.append(PropertyCheckErrorContent(), NL);
  node.append(propValue(), NL);
  node.append(propListValue(), NL);
  node.append(propMappedValue(), NL);
  node.append(propMappedListValue(), NL);
  node.append(checkProp(), NL);
  node.append(checkOptProp(), NL);
  return node;
}

/*

export function isTypedArray<T>(value: unknown, guard: (v: unknown) => v is T): value is Array<T> {
	if (isArray(value)) {
		if (value.length === 0) {
			return true;
		}

		return value.find(guard) === undefined;
	}
	return false;
}

*/

function isTypedArray() {
  const node = new CompositeGeneratorNode();
  node.append(
    'export function isTypedArray<T>(value: unknown, guard: (v: unknown) => v is T): value is Array<T> {',
    NL
  );
  node.indent((mBody) => {
    mBody.append('if (isArray(value)) {', NL);
    mBody.indent((block) => {
      block.append('if (value.length === 0) {', NL);
      block.indent((block2) => {
        block2.append('return true;', NL);
      });
      block.append('}', NL);
      block.append('return value.find(guard) === undefined;', NL);
    });
    mBody.append('}', NL);
    mBody.append('return false;', NL);
  });
  node.append('}', NL);
  return node;
}

function checkOptProp() {
  const node = new CompositeGeneratorNode();
  node.append(
    'export function checkOptProp<T, K extends string>(value: Record<string, unknown>, property: K, typeCheck: (value: unknown) => value is T, valueCheck?: (value: T) => boolean): value is Record<string, unknown> {',
    NL
  );
  node.indent((mBody) => {
    mBody.append('if (!(property in value)) {', NL);
    mBody.indent((block) => {
      block.append('return true;', NL);
    });
    mBody.append('}', NL);
    mBody.append(
      'return checkProp(value, property, typeCheck, valueCheck);',
      NL
    );
  });
  node.append('}', NL);
  return node;
}

function checkProp() {
  const node = new CompositeGeneratorNode();
  node.append(
    'export function checkProp<T, K extends string>(value: Record<string, unknown>, property: K, typeCheck: (value: unknown) => value is T, valueCheck?: (value: T) => boolean): value is Record<string, unknown> {',
    NL
  );
  node.indent((mBody) => {
    mBody.append('if (property in value) {', NL);
    mBody.indent((block) => {
      block.append('const v = value[property];', NL);
      block.append('return (', NL);
      block.indent((block2) => {
        block2.append('v !== undefined &&', NL);
        block2.append('v !== null &&', NL);
        block2.append('typeCheck(v) &&', NL);
        block2.append('(valueCheck === undefined || valueCheck(v))', NL);
      });
      block.append(');', NL);
    });
    mBody.append('}', NL);
    mBody.append('return false;', NL);
  });
  node.append('}', NL);
  return node;
}

function propMappedListValue() {
  const node = new CompositeGeneratorNode();
  node.append(
    `export function propMappedListValue<T, U>(name: string, record: Record<string, unknown>, guard: (v: unknown) => v is T, map: (v: T) => U, allow?: 'optional' | 'null' | 'optional_null'): U[] | undefined | null {`,
    NL
  );
  node.indent((mBody) => {
    mBody.append('const v = record[name];', NL);
    mBody.append(
      `if (allow === 'optional' || allow === 'optional_null') {`,
      NL
    );
    mBody.indent((block) => {
      block.append('if (isUndefined(v)) {', NL);
      block.indent((block2) => {
        block2.append('return undefined;', NL);
      });
      block.append('}', NL);
    });
    mBody.append('}', NL);
    mBody.append(`if (allow === 'null' || allow === 'optional_null') {`, NL);
    mBody.indent((block) => {
      block.append('if (isNull(v)) {', NL);
      block.indent((block2) => {
        block2.append('return null;', NL);
      });
      block.append('}', NL);
    });
    mBody.append('}', NL);
    mBody.append('if (isTypedArray(v, guard)) {', NL);
    mBody.indent((block) => {
      block.append('return v.map(map);', NL);
    });
    mBody.append('}', NL);
    mBody.append(
      'throw new PropertyCheckError(`Value in property ${name} is invalid`, name, record);',
      NL
    );
  });
  node.append('}', NL);
  return node;
}

function propMappedValue() {
  const node = new CompositeGeneratorNode();
  node.append(
    'export function propMappedValue<T, U>(name: string, record: Record<string, unknown>, guard: (v: unknown) => v is T, map: (v: T) => U): U;',
    NL
  );
  node.append(
    `export function propMappedValue<T, U>(name: string, record: Record<string, unknown>, guard: (v: unknown) => v is T, map: (v: T) => U, allow: 'optional'): U | undefined;`,
    NL
  );
  node.append(
    `export function propMappedValue<T, U>(name: string, record: Record<string, unknown>, guard: (v: unknown) => v is T, map: (v: T) => U, allow: 'null'): U | null;`,
    NL
  );
  node.append(
    `export function propMappedValue<T, U>(name: string, record: Record<string, unknown>, guard: (v: unknown) => v is T, map: (v: T) => U, allow: 'optional_null'): U | undefined | null;`,
    NL
  );
  node.append(
    `export function propMappedValue<T, U>(name: string, record: Record<string, unknown>, guard: (v: unknown) => v is T, map: (v: T) => U, allow?: 'optional' | 'null' | 'optional_null'): U | undefined | null {`,
    NL
  );
  node.indent((mBody) => {
    mBody.append('const v = record[name];', NL);
    mBody.append(
      `if (allow === 'optional' || allow === 'optional_null') {`,
      NL
    );
    mBody.indent((block) => {
      block.append('if (isUndefined(v)) {', NL);
      block.indent((block2) => {
        block2.append('return undefined;', NL);
      });
      block.append('}', NL);
    });
    mBody.append('}', NL);
    mBody.append(`if (allow === 'null' || allow === 'optional_null') {`, NL);
    mBody.indent((block) => {
      block.append('if (isNull(v)) {', NL);
      block.indent((block2) => {
        block2.append('return null;', NL);
      });
      block.append('}', NL);
    });
    mBody.append('}', NL);
    mBody.append('if (guard(v)) {', NL);
    mBody.indent((block) => {
      block.append('return map(v);', NL);
    });
    mBody.append('}', NL);
    mBody.append(
      'throw new PropertyCheckError(`Value in property ${name} is invalid`, name, record);',
      NL
    );
  });
  node.append('}', NL);
  return node;
}

function propListValue() {
  const node = new CompositeGeneratorNode();
  node.append(
    'export function propListValue<T>(name: string, record: Record<string, unknown>, guard: (v: unknown) => v is T): T[];',
    NL
  );
  node.append(
    `export function propListValue<T>(name: string, record: Record<string, unknown>, guard: (v: unknown) => v is T, allow: 'optional'): T[] | undefined;`,
    NL
  );
  node.append(
    `export function propListValue<T>(name: string, record: Record<string, unknown>, guard: (v: unknown) => v is T, allow: 'null'): T[] | null;`,
    NL
  );
  node.append(
    `export function propListValue<T>(name: string, record: Record<string, unknown>, guard: (v: unknown) => v is T, allow: 'optional_null'): T[] | undefined | null;`,
    NL
  );
  node.append(
    `export function propListValue<T>(name: string, record: Record<string, unknown>, guard: (v: unknown) => v is T, allow?: 'optional' | 'null' | 'optional_null'): T[] | undefined | null {`,
    NL
  );
  node.indent((mBody) => {
    mBody.append('const v = record[name];', NL);
    mBody.append(`if (allow === 'optional' || allow == 'optional_null') {`, NL);
    mBody.indent((block) => {
      block.append('if (isUndefined(v)) {', NL);
      block.indent((block2) => {
        block2.append('return undefined;', NL);
      });
      block.append('}', NL);
    });
    mBody.append('}', NL);
    mBody.append(`if (allow === 'null' || allow === 'optional_null') {`, NL);
    mBody.indent((block) => {
      block.append('if (isNull(v)) {', NL);
      block.indent((block2) => {
        block2.append('return null;', NL);
      });
      block.append('}', NL);
    });
    mBody.append('}', NL);
    mBody.append('if (isTypedArray(v, guard)) {', NL);
    mBody.indent((block) => {
      block.append('return v;', NL);
    });
    mBody.append('}', NL);
    mBody.append(
      'throw new PropertyCheckError(`Value in property ${name} is invalid`, name, record);',
      NL
    );
  });
  node.append('}', NL);

  return node;
}

function propValue() {
  const node = new CompositeGeneratorNode();
  node.append(
    'export function propValue<T>(name: string, record: Record<string, unknown>, guard: (v: unknown) => v is T): T;',
    NL
  );
  node.append(
    `export function propValue<T>(name: string, record: Record<string, unknown>, guard: (v: unknown) => v is T, allow: 'optional'): T | undefined;`,
    NL
  );
  node.append(
    `export function propValue<T>(name: string, record: Record<string, unknown>, guard: (v: unknown) => v is T, allow: 'null'): T | null;`,
    NL
  );
  node.append(
    `export function propValue<T>(name: string, record: Record<string, unknown>, guard: (v: unknown) => v is T, allow: 'optional_null'): T | null | undefined;`,
    NL
  );

  node.append(
    `export function propValue<T>(name: string, record: Record<string, unknown>, guard: (v: unknown) => v is T, allow?: 'optional' | 'null' | 'optional_null'): T | null | undefined {`,
    NL
  );
  node.indent((mBody) => {
    mBody.append('const v = record[name];', NL);
    mBody.append(
      `if (allow === 'optional' || allow === 'optional_null') {`,
      NL
    );
    mBody.indent((block) => {
      block.append('if (isUndefined(v)) {', NL);
      block.indent((block2) => {
        block2.append('return undefined;', NL);
      });
      block.append('}', NL);
    });
    mBody.append('}', NL);

    mBody.append(`if (allow === 'null' || allow === 'optional_null') {`, NL);
    mBody.indent((block) => {
      block.append('if (isNull(v)) {', NL);
      block.indent((block2) => {
        block2.append('return null;', NL);
      });
      block.append('}', NL);
    });
    mBody.append('}', NL);
    mBody.append('if (guard(v)) {', NL);
    mBody.indent((block) => {
      block.append('return v;', NL);
    });
    mBody.append('}', NL, NL);
    mBody.append(
      'throw new PropertyCheckError(`Value in property ${name} is invalid`, name, record);',
      NL
    );
  });
  node.append('}', NL);
  return node;
}

function PropertyCheckErrorContent() {
  const node = new CompositeGeneratorNode();
  node.append('export class PropertyCheckError extends Error {', NL);
  node.indent((clBody) => {
    clBody.append('readonly property: string;', NL);
    clBody.append('readonly record: Record<string, unknown>;', NL, NL);
    clBody.append(
      'constructor(message: string, property: string, record: Record<string, unknown>) {',
      NL
    );
    clBody.indent((mBody) => {
      mBody.append('super(message);', NL);
      mBody.append('this.property = property;', NL);
      mBody.append('this.record = record;', NL);
    });
    clBody.append('}', NL);
  });
  node.append('}', NL);
  return node;
}

function singleStatementFunction(method: string, content: string) {
  const node = new CompositeGeneratorNode();
  node.append(method, ' {', NL);
  node.indent((mBody) => {
    mBody.append(content, ';', NL);
  });
  node.append('}', NL);
  return node;
}
