export interface TsRange {
	start: number;
	end: number;
}

export function fromString(str: string): TsRange {
	const [start, end] = str
		.substring(1, str.length - 1)
		.split(',')
		.map(Number);
	return { start, end };
}

export function toString(range: TsRange): string {
	// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
	return `[${range.start},${range.end}]`;
}

export function isRange(value: unknown): value is TsRange {
	if (typeof value !== 'object' || value === null) {
		return false;
	}
	const { start, end } = value as Record<string, unknown>;
	return typeof start === 'number' && typeof end === 'number';
}
