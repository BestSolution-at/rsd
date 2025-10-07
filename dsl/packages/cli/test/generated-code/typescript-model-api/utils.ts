export function addFooProperty<T>(value: T): T {
	return { ...value, foo: 'bar' };
}

export function removeProperty(
	value: Record<string, unknown>,
	prop: string,
): { withOut: Record<string, unknown>; withUndefined: Record<string, unknown> } {
	const withOut = { ...value };
	// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
	delete withOut[prop];
	const withUndefined = { ...value };
	withUndefined[prop] = undefined;
	return { withOut, withUndefined };
}

const Invalid = Symbol('Invalid');

export function invalidateProperty(value: Record<string, unknown>, prop: string): Record<string, unknown> {
	const copy = { ...value };
	copy[prop] = Invalid;
	return copy;
}

export function invalidateArrayProperty(value: Record<string, unknown>, prop: string): Record<string, unknown> {
	const copy = { ...value };

	const arr = copy[prop];
	if (Array.isArray(arr)) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		copy[prop] = [...arr, Invalid];
	}
	return copy;
}
