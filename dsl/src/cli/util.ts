export function isDefined<T>(value: T | undefined): value is T {
  return value !== undefined;
}

export function isObject(value: unknown): value is Object {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

export function toFirstUpper(value: string) {
  return value[0].toUpperCase() + value.substring(1);
}

export function toFirstLower(value: string) {
  return value[0].toLowerCase() + value.substring(1);
}
