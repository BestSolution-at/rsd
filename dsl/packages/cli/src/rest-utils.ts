export function computePath(orignalPath: string): {
	path: string;
	variables: string[];
} {
	const regex = /(\$\{\w+\})/g;

	let lastMatchEnd = 0;
	let path = '';
	const variables: string[] = [];
	for (const match of orignalPath.matchAll(regex)) {
		if (match?.index === undefined) {
			continue;
		}
		if (match.index - lastMatchEnd > 0) {
			path += orignalPath.substring(lastMatchEnd, match.index);
		}
		if (match[0].length > 0) {
			path += '%s';
			variables.push(match[0].substring(2, match[0].length - 1));
		}
		lastMatchEnd = match.index + match[0].length;
	}
	if (lastMatchEnd < orignalPath.length) {
		path += orignalPath.substring(lastMatchEnd);
	}

	if (path.endsWith('/')) {
		path = path.substring(0, path.length - 1);
	}

	return { path, variables };
}
