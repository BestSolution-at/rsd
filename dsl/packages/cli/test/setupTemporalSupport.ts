import { expect } from 'vitest';
import { RSDOffsetDateTime } from './test-specs/gen-out/client/typescript-client/src/model/_Builtins.js';

expect.addEqualityTesters([
	function temporalEquality(a, b) {
		if (a instanceof Temporal.Instant && b instanceof Temporal.Instant) {
			return a.equals(b);
		}
		if (a instanceof Temporal.PlainDate && b instanceof Temporal.PlainDate) {
			return a.equals(b);
		}
		if (a instanceof Temporal.PlainDateTime && b instanceof Temporal.PlainDateTime) {
			return a.equals(b);
		}
		if (a instanceof Temporal.PlainTime && b instanceof Temporal.PlainTime) {
			return a.equals(b);
		}
		if (a instanceof Temporal.ZonedDateTime && b instanceof Temporal.ZonedDateTime) {
			return a.equals(b);
		}
		if (a instanceof RSDOffsetDateTime && b instanceof RSDOffsetDateTime) {
			a.zonedDateTime.equals(b.zonedDateTime);
		}
	},
]);
