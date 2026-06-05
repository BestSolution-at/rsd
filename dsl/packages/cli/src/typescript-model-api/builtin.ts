import { CompositeGeneratorNode } from 'langium/generate';
import { toNodeTree } from '../util.js';

export function generateBuiltinContent(): CompositeGeneratorNode {
	return toNodeTree(`
export type RSDZonedDateTime = string;
export function RSDZonedDateTimeFromJSON(value: string): RSDZonedDateTime {
    return value;
}
export function RSDZonedDateTimeToJSON(value: RSDZonedDateTime): string {
    return value;
}
export function isRSDZonedDateTime(value: unknown): value is RSDZonedDateTime {
    return typeof value === 'string';
}

export type RSDLocalDateTime = string;
export function RSDLocalDateTimeFromJSON(value: string): RSDLocalDateTime {
    return value;
}
export function RSDLocalDateTimeToJSON(value: RSDLocalDateTime): string {
    return value;
}
export function isRSDLocalDateTime(value: unknown): value is RSDLocalDateTime {
    return typeof value === 'string';
}

export type RSDLocalDate = string;
export function RSDLocalDateFromJSON(value: string): RSDLocalDate {
    return value;
}
export function RSDLocalDateToJSON(value: RSDLocalDate): string {
    return value;
}
export function isRSDLocalDate(value: unknown): value is RSDLocalDate {
    return typeof value === 'string';
}

export type RSDLocalTime = string;
export function RSDLocalTimeFromJSON(value: string): RSDLocalTime {
    return value;
}
export function RSDLocalTimeToJSON(value: RSDLocalTime): string {
    return value;
}
export function isRSDLocalTime(value: unknown): value is RSDLocalTime {
    return typeof value === 'string';
}

export type RSDOffsetDateTime = string;
export function RSDOffsetDateTimeFromJSON(value: string): RSDOffsetDateTime {
    return value;
}
export function RSDOffsetDateTimeToJSON(value: RSDOffsetDateTime): string {
    return value;
}
export function isRSDOffsetDateTime(value: unknown): value is RSDOffsetDateTime {
    return typeof value === 'string';
}

export type RSDLong = number;
export function isRSDLong(value: unknown): value is RSDLong {
    return typeof value === 'number' 
        && Number.isInteger(value);
}

export type RSDInt = number;
export function isRSDInt(value: unknown): value is RSDInt {
    return typeof value === 'number' 
        && Number.isInteger(value)
        && value >= -2147483648
        && value <= 2147483647;
}

export type RSDShort = number;
export function isRSDShort(value: unknown): value is RSDShort {
    return typeof value === 'number'
        && Number.isInteger(value)
        && value >= -32768
        && value <= 32767;
}

export type RSDFloat = number;
export function isRSDFloat(value: unknown): value is RSDFloat {
    return typeof value === 'number'
        && !Number.isNaN(value)
        && Number.isFinite(value)
        && value >= -3.4028235e+38
        && value <= 3.4028235e+38;
}

export type RSDDouble = number;
export function isRSDDouble(value: unknown): value is RSDDouble {
    return typeof value === 'number'
        && !Number.isNaN(value)
        && Number.isFinite(value);
}

export type RSDString = string;
export function isRSDString(value: unknown): value is RSDString {
    return typeof value === 'string';
}

export type RSDBoolean = boolean;
export function isRSDBoolean(value: unknown): value is RSDBoolean {
    return typeof value === 'boolean';
}
`);
}
