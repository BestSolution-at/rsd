import { CompositeGeneratorNode } from 'langium/generate';
import { toNodeTree } from '../util.js';

export function generateBuiltinContent(): CompositeGeneratorNode {
	return toNodeTree(`
export type RSDZonedDateTime = string;
export function ZonedDateTimeFromJSON(value: string): RSDZonedDateTime {
    return value;
}
export function ZonedDateTimeToJSON(value: RSDZonedDateTime): string {
    return value;
}
export function isZonedDateTime(value: unknown): value is RSDZonedDateTime {
    return typeof value === 'string';
}

export type RSDLocalDateTime = string;
export function LocalDateTimeFromJSON(value: string): RSDLocalDateTime {
    return value;
}
export function LocalDateTimeToJSON(value: RSDLocalDateTime): string {
    return value;
}
export function isLocalDateTime(value: unknown): value is RSDLocalDateTime {
    return typeof value === 'string';
}

export type RSDLocalDate = string;
export function LocalDateFromJSON(value: string): RSDLocalDate {
    return value;
}
export function LocalDateToJSON(value: RSDLocalDate): string {
    return value;
}
export function isLocalDate(value: unknown): value is RSDLocalDate {
    return typeof value === 'string';
}

export type RSDLocalTime = string;
export function LocalTimeFromJSON(value: string): RSDLocalTime {
    return value;
}
export function LocalTimeToJSON(value: RSDLocalTime): string {
    return value;
}
export function isLocalTime(value: unknown): value is RSDLocalTime {
    return typeof value === 'string';
}

export type RSDOffsetDateTime = string;
export function OffsetDateTimeFromJSON(value: string): RSDOffsetDateTime {
    return value;
}
export function OffsetDateTimeToJSON(value: RSDOffsetDateTime): string {
    return value;
}
export function isOffsetDateTime(value: unknown): value is RSDOffsetDateTime {
    return typeof value === 'string';
}

export type RSDLong = number;
export function isLong(value: unknown): value is RSDLong {
    return typeof value === 'number' 
        && Number.isInteger(value);
}

export type RSDInt = number;
export function isInt(value: unknown): value is RSDInt {
    return typeof value === 'number' 
        && Number.isInteger(value)
        && value >= -2147483648
        && value <= 2147483647;
}

export type RSDShort = number;
export function isShort(value: unknown): value is RSDShort {
    return typeof value === 'number'
        && Number.isInteger(value)
        && value >= -32768
        && value <= 32767;
}

export type RSDFloat = number;
export function isFloat(value: unknown): value is RSDFloat {
    return typeof value === 'number'
        && !Number.isNaN(value)
        && Number.isFinite(value)
        && Math.fround(value) === value;
}

export type RSDDouble = number;
export function isDouble(value: unknown): value is RSDDouble {
    return typeof value === 'number'
        && !Number.isNaN(value)
        && Number.isFinite(value);
}

export type RSDString = string;
export function isString(value: unknown): value is RSDString {
    return typeof value === 'string';
}

export type RSDBoolean = boolean;
export function isBoolean(value: unknown): value is RSDBoolean {
    return typeof value === 'boolean';
}
`);
}
