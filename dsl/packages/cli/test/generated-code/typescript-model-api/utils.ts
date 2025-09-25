export function addFooProperty<T>(value: T): T {
	return { ...value, foo: 'bar' };
}
