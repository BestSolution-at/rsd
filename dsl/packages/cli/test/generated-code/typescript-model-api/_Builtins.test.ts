import { describe, expect, test } from 'vitest';
import {
	RSDZonedDateTimeFromJSON,
	RSDZonedDateTimeToJSON,
} from '../../test-specs/gen-out/client/typescript-client/src/model/index.js';

const ZONED_DATE_TIME_1 = Temporal.ZonedDateTime.from('2024-06-01T12:00:00+02:00[Europe/Berlin]');
const ZONED_DATE_TIME_2 = Temporal.ZonedDateTime.from('2024-06-01T10:00:00Z[UTC]');

describe('RSDZonedDateTime', () => {
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
