import { CompositeGeneratorNode, NL } from 'langium/generate';
import {
	isMBuiltinFloatType,
	isMBuiltinIntegerType,
	isMBuiltinType,
	isMInlineEnumType,
	isMKeyProperty,
	isMResolvedUnionType,
	isMRevisionProperty,
	MBuiltinType,
	MResolvedBaseProperty,
	MResolvedPropery,
	MResolvedRecordType,
} from '../model.js';
import { computeAPIType, primitiveToObject } from '../java-gen-utils.js';
import { BuiltinType } from 'remote-service-description-language';
import { toFirstUpper, toNode } from '../util.js';

export function generatePropertyNG(
	owner: MResolvedRecordType,
	prop: MResolvedBaseProperty,
	nativeTypeSubstitues: Record<string, string> | undefined,
	interfaceBasePackage: string,
	fqn: (type: string) => string,
) {
	const type = computeAPIType(prop, nativeTypeSubstitues, interfaceBasePackage, fqn);

	const node = new CompositeGeneratorNode();
	node.append(`public ${type} ${prop.name}() {`, NL);

	node.indent(methodBody => {
		methodBody.append(generatePropertyContent(prop, nativeTypeSubstitues, interfaceBasePackage, fqn));
	});

	node.append('}', NL);
	return node;
}

function generatePropertyContent(
	prop: MResolvedBaseProperty,
	nativeTypeSubstitues: Record<string, string> | undefined,
	interfaceBasePackage: string,
	fqn: (type: string) => string,
) {
	let mapper: string;
	const array = !isMKeyProperty(prop) && !isMRevisionProperty(prop) && prop.array;

	if (isMBuiltinType(prop.type)) {
		if (array) {
			mapper = builtinSimpleJSONArrayAccess({
				type: prop.type,
				name: prop.name,
			});
		} else {
			if (isMKeyProperty(prop) || isMRevisionProperty(prop) || (!prop.optional && !prop.nullable)) {
				mapper = builtinSimpleJSONAccessNG({
					name: prop.name,
					type: prop.type,
				});
			} else {
				mapper = builtinOptionalJSONAccessNG({
					name: prop.name,
					type: prop.type,
				});
			}
		}
	} else if (isMInlineEnumType(prop.type)) {
		const Type = computeAPIType(prop, nativeTypeSubstitues, interfaceBasePackage, fqn, true);
		if (array) {
			mapper = `_JsonUtils.mapLiterals(data, "${prop.name}", ${Type}::valueOf)`;
		} else {
			mapper = `_JsonUtils.mapLiteral(data, "${prop.name}", ${Type}::valueOf)`;
		}
	} else {
		if (!isMKeyProperty(prop) && !isMRevisionProperty(prop)) {
			if (prop.variant === 'enum') {
				if (array) {
					mapper = `_JsonUtils.mapLiterals(data, "${prop.name}", ${prop.type}::valueOf)`;
				} else {
					mapper = `_JsonUtils.mapLiteral(data, "${prop.name}", ${prop.type}::valueOf)`;
				}
			} else if (prop.variant === 'scalar') {
				const Type = computeAPIType(prop, nativeTypeSubstitues, interfaceBasePackage, fqn, true);
				if (array) {
					mapper = `_JsonUtils.mapLiterals(data, "${prop.name}", ${Type}::of)`;
				} else {
					mapper = `_JsonUtils.mapLiteral(data, "${prop.name}", ${Type}::of)`;
				}
			} else {
				/*const Type = computeAPIType(
          owner,
          prop,
          nativeTypeSubstitues,
          interfaceBasePackage,
          fqn,
          true
        );*/
				if (array) {
					mapper = `_JsonUtils.mapObjects(data, "${prop.name}", ${prop.type}DataImpl::of)`;
				} else {
					if (prop.optional) {
						mapper = `_JsonUtils.mapObject(data, "${prop.name}", ${prop.type}DataImpl::of, null)`;
					} else {
						mapper = `_JsonUtils.mapObject(data, "${prop.name}", ${prop.type}DataImpl::of)`;
					}
				}
			}
		} else {
			mapper = 'Foo';
		}
	}

	const node = new CompositeGeneratorNode();
	node.append(`return ${mapper};`, NL);
	return node;
}

export function builtinSimpleJSONAccessNG(property: { type: MBuiltinType; name: string }): string {
	switch (property.type) {
		case 'boolean':
			return `_JsonUtils.mapBoolean(data, "${property.name}")`;
		case 'double':
			return `_JsonUtils.mapDouble(data, "${property.name}")`;
		case 'float':
			return `_JsonUtils.mapFloat(data, "${property.name}")`;
		case 'int':
			return `_JsonUtils.mapInt(data, "${property.name}")`;
		case 'local-date':
			return `_JsonUtils.mapLocalDate(data, "${property.name}")`;
		case 'local-date-time':
			return `_JsonUtils.mapLocalDateTime(data, "${property.name}")`;
		case 'long':
			return `_JsonUtils.mapLong(data, "${property.name}")`;
		case 'short':
			return `_JsonUtils.mapShort(data, "${property.name}")`;
		case 'string':
			return `_JsonUtils.mapString(data, "${property.name}")`;
		case 'zoned-date-time':
			return `_JsonUtils.mapZonedDateTime(data, "${property.name}")`;
	}
}

export function builtinSimpleJSONArrayAccess(property: { type: MBuiltinType; name: string }): string {
	switch (property.type) {
		case 'boolean':
			return `_JsonUtils.mapBooleans(data, "${property.name}")`;
		case 'double':
			return `_JsonUtils.mapDoubles(data, "${property.name}")`;
		case 'float':
			return `_JsonUtils.mapFloats(data, "${property.name}")`;
		case 'int':
			return `_JsonUtils.mapInts(data, "${property.name}")`;
		case 'local-date':
			return `_JsonUtils.mapLocalDates(data, "${property.name}")`;
		case 'local-date-time':
			return `_JsonUtils.mapLocalDateTimes(data, "${property.name}")`;
		case 'long':
			return `_JsonUtils.mapLongs(data, "${property.name}")`;
		case 'short':
			return `_JsonUtils.mapShorts(data, "${property.name}")`;
		case 'string':
			return `_JsonUtils.mapStrings(data, "${property.name}")`;
		case 'zoned-date-time':
			return `_JsonUtils.mapZonedDateTimes(data, "${property.name}")`;
	}
}

export function builtinOptionalJSONAccessNG(property: { type: MBuiltinType; name: string }): string {
	switch (property.type) {
		case 'boolean':
			return `_JsonUtils.mapBoolean(data, "${property.name}", false)`;
		case 'double':
			return `_JsonUtils.mapDouble(data, "${property.name}", 0)`;
		case 'float':
			return `_JsonUtils.mapFloat(data, "${property.name}", 0)`;
		case 'int':
			return `_JsonUtils.mapInt(data, "${property.name}", 0)`;
		case 'local-date':
			return `_JsonUtils.mapLocalDate(data, "${property.name}", null)`;
		case 'local-date-time':
			return `_JsonUtils.mapLocalDateTime(data, "${property.name}", null)`;
		case 'long':
			return `_JsonUtils.mapLong(data, "${property.name}", 0)`;
		case 'short':
			return `_JsonUtils.mapShort(data, "${property.name}", (short) 0)`;
		case 'string':
			return `_JsonUtils.mapString(data, "${property.name}", null)`;
		case 'zoned-date-time':
			return `_JsonUtils.mapZonedDateTime(data, "${property.name}", null)`;
	}
}

export function builtinBuilderArrayJSONAccess(
	property: {
		type: MBuiltinType;
		name: string;
	},
	builderName = '$builder',
): string {
	switch (property.type) {
		case 'boolean':
			return `${builderName}.add("${property.name}", _JsonUtils.toJsonBooleanArray(${property.name}))`;
		case 'double':
			return `${builderName}.add("${property.name}", _JsonUtils.toJsonDoubleArray(${property.name}))`;
		case 'float':
			return `${builderName}.add("${property.name}", _JsonUtils.toJsonFloatArray(${property.name}))`;
		case 'int':
			return `${builderName}.add("${property.name}", _JsonUtils.toJsonIntArray(${property.name}))`;
		case 'local-date':
			return `${builderName}.add("${property.name}", _JsonUtils.toJsonLiteralArray(${property.name}))`;
		case 'local-date-time':
			return `${builderName}.add("${property.name}", _JsonUtils.toJsonLiteralArray(${property.name})::toString))`;
		case 'long':
			return `${builderName}.add("${property.name}", _JsonUtils.toJsonLongArray(${property.name}))`;
		case 'short':
			return `${builderName}.add("${property.name}", _JsonUtils.toJsonShortArray(${property.name}))`;
		case 'string':
			return `${builderName}.add("${property.name}", _JsonUtils.toJsonStringArray(${property.name}))`;
		case 'zoned-date-time':
			return `${builderName}.add("${property.name}", _JsonUtils.toJsonLiteralArray(${property.name}))`;
	}
}

export function builtinBuilderAccess(property: { type: MBuiltinType; name: string }): string {
	switch (property.type) {
		case 'boolean':
		case 'double':
		case 'float':
		case 'int':
		case 'long':
		case 'short':
		case 'string':
			return `$builder.add("${property.name}", ${property.name})`;
		case 'local-date':
		case 'local-date-time':
		case 'zoned-date-time':
			return `$builder.add("${property.name}", ${property.name}.toString())`;
	}
}

function generatePatchPropertyAccessorContent_Builtin(property: { type: BuiltinType; name: string; array: boolean }) {
	const type = property.type;
	const methodBody = new CompositeGeneratorNode();
	methodBody.append(
		'return ',
		property.array
			? builtinNilArrayJSONAccess({ type, name: property.name })
			: builtinNilJSONAccess({ type, name: property.name }),
		';',
		NL,
	);
	return methodBody;
}

function generatePatchPropertyAccessorContent_Scalar(
	property: MResolvedPropery,
	nativeTypeSubstitues: Record<string, string> | undefined,
	basePackageName: string,
	fqn: (type: string) => string,
) {
	const Type = computeAPIType(property, nativeTypeSubstitues, basePackageName, fqn, true);
	const methodBody = new CompositeGeneratorNode();
	if (property.array) {
		methodBody.append(`return _JsonUtils.mapNilLiterals(data, "${property.name}", ${Type}::of );`, NL);
	} else {
		methodBody.append(`return _JsonUtils.mapNilLiteral(data, "${property.name}", ${Type}::of );`, NL);
	}
	return methodBody;
}

function generatePatchPropertyAccessor_NoRecord(
	property: MResolvedPropery,
	nativeTypeSubstitues: Record<string, string> | undefined,
	basePackageName: string,
	fqn: (type: string) => string,
) {
	const node = new CompositeGeneratorNode();
	const type = primitiveToObject(computeAPIType(property, nativeTypeSubstitues, basePackageName, fqn));
	if (property.optional || property.nullable) {
		const _Base = fqn(basePackageName + '._Base');
		node.append(`public ${_Base}.Nillable<${type}> ${property.name}() {`, NL);
		if (typeof property.type === 'string') {
			const type = property.type;
			if (isMBuiltinType(type)) {
				node.indent(methodBody => {
					methodBody.append(
						generatePatchPropertyAccessorContent_Builtin({
							array: property.array,
							type: type,
							name: property.name,
						}),
					);
				});
			} else if (property.variant === 'scalar') {
				node.indent(methodBody => {
					methodBody.append(
						generatePatchPropertyAccessorContent_Scalar(property, nativeTypeSubstitues, basePackageName, fqn),
					);
				});
			} else if (property.variant === 'enum') {
				node.indent(methodBody => {
					if (property.array) {
						methodBody.append(
							`return _JsonUtils.mapNilLiterals(data, "${property.name}", ${property.type}::valueOf);`,
							NL,
						);
					} else {
						methodBody.append(
							`return _JsonUtils.mapNilLiteral(data, "${property.name}", ${property.type}::valueOf);`,
							NL,
						);
					}
				});
			}
		} else {
			const Type = computeAPIType(property, nativeTypeSubstitues, basePackageName, fqn, true);
			node.indent(methodBody => {
				if (property.array) {
					methodBody.append(`return _JsonUtils.mapNilLiterals(data, "${property.name}", ${Type}::valueOf)`, NL);
				} else {
					methodBody.append(`return _JsonUtils.mapNilLiteral(data, "${property.name}", ${Type}::valueOf)`, NL);
				}
			});
		}
		node.append('}', NL);
	} else {
		if (type === 'Integer') {
			const Optional = fqn('java.util.OptionalInt');
			node.append(`public ${Optional} ${property.name}() {`, NL);
		} else if (type === 'Long') {
			const Optional = fqn('java.util.OptionalLong');
			node.append(`public ${Optional} ${property.name}() {`, NL);
		} else if (type === 'Double') {
			const Optional = fqn('java.util.OptionalDouble');
			node.append(`public ${Optional} ${property.name}() {`, NL);
		} else {
			const Optional = fqn('java.util.Optional');
			node.append(`public ${Optional}<${type}> ${property.name}() {`, NL);
		}

		if (typeof property.type === 'string') {
			const type = property.type;
			if (isMBuiltinType(type)) {
				node.indent(methodBody => {
					methodBody.append(
						'return ',
						property.array
							? builtinOptArrayJSONAccess({ type, name: property.name })
							: builtinOptJSONAccess({ type, name: property.name }),
						';',
						NL,
					);
				});
			} else if (property.variant === 'scalar') {
				const Type = computeAPIType(property, nativeTypeSubstitues, basePackageName, fqn, true);
				node.indent(methodBody => {
					if (property.array) {
						methodBody.append(`return _JsonUtils.mapOptLiterals(data, "${property.name}", ${Type}::of);`, NL);
					} else {
						methodBody.append(`return _JsonUtils.mapOptLiteral(data, "${property.name}", ${Type}::of);`, NL);
					}
				});
			} else if (property.variant === 'enum') {
				node.indent(methodBody => {
					if (property.array) {
						methodBody.append(
							`return _JsonUtils.mapOptLiterals(data, "${property.name}", ${property.type}::valueOf);`,
							NL,
						);
					} else {
						methodBody.append(
							`return _JsonUtils.mapOptLiteral(data, "${property.name}", ${property.type}::valueOf);`,
							NL,
						);
					}
				});
			}
		} else {
			const Type = computeAPIType(property, nativeTypeSubstitues, basePackageName, fqn, true);
			node.indent(methodBody => {
				if (property.array) {
					methodBody.append(`return _JsonUtils.mapOptLiterals(data, "${property.name}", ${Type}::valueOf);`, NL);
				} else {
					methodBody.append(`return _JsonUtils.mapOptLiteral(data, "${property.name}", ${Type}::valueOf);`, NL);
				}
			});
		}

		node.append('}', NL);
	}
	return node;
}

export function generatePatchPropertyAccessor(
	property: MResolvedPropery,
	nativeTypeSubstitues: Record<string, string> | undefined,
	basePackageName: string,
	fqn: (type: string) => string,
) {
	if (property.array) {
		return generatePatchPropertyAccessor_Array(property, nativeTypeSubstitues, basePackageName, fqn);
	} else {
		return generatePatchPropertyAccessor_Scalar(property, nativeTypeSubstitues, basePackageName, fqn);
	}
}

function generatePatchPropertyAccessor_Array(
	property: MResolvedPropery,
	nativeTypeSubstitues: Record<string, string> | undefined,
	basePackageName: string,
	fqn: (type: string) => string,
) {
	const Optional = fqn('java.util.Optional');
	const prefix = toFirstUpper(property.name);
	return toNode([
		`public ${Optional}<${prefix}Change> ${property.name}() {`,
		[
			`return _JsonUtils.mapOptObject(data, "${property.name}", o -> _ListChangeSupport.of(o, "@type", ${prefix}SetChangeImpl::new, ${prefix}MergeChangeImpl::new));`,
		],
		'}',
	]);
}

function generatePatchPropertyAccessor_Scalar(
	property: MResolvedPropery,
	nativeTypeSubstitues: Record<string, string> | undefined,
	basePackageName: string,
	fqn: (type: string) => string,
) {
	const node = new CompositeGeneratorNode();
	if (
		property.variant === 'builtin' ||
		property.variant === 'enum' ||
		property.variant === 'inline-enum' ||
		property.variant === 'scalar'
	) {
		node.append(generatePatchPropertyAccessor_NoRecord(property, nativeTypeSubstitues, basePackageName, fqn));
	} else {
		const type = computeAPIType(property, nativeTypeSubstitues, basePackageName, fqn);
		if (property.optional || property.nullable) {
			const _Base = fqn(basePackageName + '._Base');
			const BaseType = fqn(`${basePackageName}.${property.type}`);
			node.append(`public ${_Base}.Nillable<${BaseType}> ${property.name}() {`, NL);
			node.indent(methodBody => {
				methodBody.append(
					`return _JsonUtils.mapNilObject(data, "${property.name}", o -> ${property.type}DataImpl.isSupportedType(o) ? ${property.type}DataImpl.of(o) : ${property.type}PatchImpl.of(o));`,
					NL,
				);
			});
			node.append('}', NL);
		} else {
			const Optional = fqn('java.util.Optional');
			node.append(`public ${Optional}<${type}> ${property.name}() {`, NL);
			node.indent(methodBody => {
				if (property.array) {
					methodBody.append(
						`return _JsonUtils.mapOptObjects(data, "${property.name}", ${property.type}DataImpl::of);`,
						NL,
					);
				} else {
					methodBody.append(
						`return _JsonUtils.mapOptObject(data, "${property.name}", ${property.type}DataImpl::of);`,
						NL,
					);
				}
			});
			node.append('}', NL);
		}
	}

	return node;
}

function generatePatchBuilderPropertyAccessor_NoRecord_Scalar(
	t: MResolvedRecordType,
	property: MResolvedPropery,
	nativeTypeSubstitues: Record<string, string> | undefined,
	basePackageName: string,
	fqn: (type: string) => string,
) {
	let type = computeAPIType(property, nativeTypeSubstitues, basePackageName, fqn);

	if (property.optional || property.nullable) {
		type = primitiveToObject(type);
	}

	const node = new CompositeGeneratorNode();
	node.append('@Override', NL);
	node.append(`public ${t.name}.PatchBuilder ${property.name}(${type} ${property.name}) {`, NL);

	if (property.optional || property.nullable) {
		node.indent(methodBody => {
			methodBody.append(`if (${property.name} == null) {`, NL);
			methodBody.indent(block => {
				block.append(`$builder.addNull("${property.name}");`, NL);
				block.append('return this;', NL);
			});
			methodBody.append('}', NL);
		});
	}

	let content: string;
	if (property.variant === 'builtin' && isMBuiltinType(property.type)) {
		if (property.array) {
			content = builtinBuilderArrayJSONAccess({
				type: property.type,
				name: property.name,
			});
		} else {
			content = builtinBuilderAccess({
				type: property.type,
				name: property.name,
			});
		}
	} else if (property.variant === 'scalar') {
		if (property.array) {
			content = `$builder.add("${property.name}", _JsonUtils.toJsonLiteralArray(${property.name}))`;
		} else {
			content = `$builder.add("${property.name}", ${property.name}.toString())`;
		}
	}
	node.indent(methodBody => {
		methodBody.append(content, ';', NL);
		methodBody.append('return this;', NL);
	});

	node.append('}', NL);

	return node;
}

function generatePatchBuilderPropertyAccessor_Array(
	t: MResolvedRecordType,
	property: MResolvedPropery,
	nativeTypeSubstitues: Record<string, string> | undefined,
	basePackageName: string,
	fqn: (type: string) => string,
) {
	let type = primitiveToObject(computeAPIType(property, nativeTypeSubstitues, basePackageName, fqn, true));
	const node = new CompositeGeneratorNode();

	if (
		property.variant === 'builtin' ||
		property.variant === 'enum' ||
		property.variant === 'inline-enum' ||
		property.variant === 'scalar'
	) {
		const List = fqn('java.util.List');
		const prefix = toFirstUpper(property.name);
		node.append('@Override', NL);
		node.append(`public ${t.name}.PatchBuilder ${property.name}(${prefix}Change ${property.name}) {`, NL);
		node.indent(mBody => {
			mBody.append(`$builder.add("${property.name}", ((_BaseDataImpl) ${property.name}).data);`, NL);
			mBody.append('return this;', NL);
		});
		node.append('}', NL, NL);
		node.append(
			`public ${t.name}.PatchBuilder ${property.name}(${List}<${type}> additions, ${List}<${type}> removals) {`,
			NL,
		);
		node.indent(mBody => {
			mBody.append('var $changeBuilder = Json.createObjectBuilder();', NL);
			mBody.append('$changeBuilder.add("@type", "merge");', NL);
			if (isMBuiltinType(property.type)) {
				mBody.append(
					builtinBuilderArrayJSONAccess({ type: property.type, name: 'additions' }, '$changeBuilder'),
					';',
					NL,
				);
				mBody.append(
					builtinBuilderArrayJSONAccess({ type: property.type, name: 'removals' }, '$changeBuilder'),
					';',
					NL,
				);
			} else {
				mBody.append(`$changeBuilder.add("additions", _JsonUtils.toJsonLiteralArray(additions));`, NL);
				mBody.append(`$changeBuilder.add("removals", _JsonUtils.toJsonLiteralArray(removals));`, NL);
			}

			mBody.append(`$builder.add("${property.name}", $changeBuilder.build());`, NL);
			mBody.append('return this;', NL);
		});
		node.append('}', NL, NL);
		node.append(
			toNode([
				`public ${t.name}.PatchBuilder ${property.name}(List<${type}> elements) {`,
				[
					'var $changeBuilder = Json.createObjectBuilder();',
					'$changeBuilder.add("@type", "replace");',
					(() => {
						if (property.type === 'boolean') {
							return '$changeBuilder.add("elements", _JsonUtils.toJsonBooleanArray(elements));';
						} else if (isMBuiltinIntegerType(property.type)) {
							if (property.type === 'int') {
								return '$changeBuilder.add("elements", _JsonUtils.toJsonIntArray(elements));';
							} else if (property.type === 'long') {
								return '$changeBuilder.add("elements", _JsonUtils.toJsonLongArray(elements));';
							} else if (property.type === 'short') {
								return '$changeBuilder.add("elements", _JsonUtils.toJsonShortArray(elements));';
							}
						} else if (isMBuiltinFloatType(property.type)) {
							if (property.type === 'double') {
								return '$changeBuilder.add("elements", _JsonUtils.toJsonDoubleArray(elements));';
							} else if (property.type === 'float') {
								return '$changeBuilder.add("elements", _JsonUtils.toJsonFloatArray(elements));';
							}
						}
						return '$changeBuilder.add("elements", _JsonUtils.toJsonLiteralArray(elements));';
					})(),
					`$builder.add("${property.name}", $changeBuilder.build());`,
					'return this;',
				],
				'}',
			]),
		);
	} else {
		const baseType = fqn(`${basePackageName}.${property.type}`);
		const List = fqn('java.util.List');
		const prefix = toFirstUpper(property.name);
		node.append(`public ${t.name}.PatchBuilder ${property.name}(${prefix}Change ${property.name}) {`, NL);
		node.indent(mBody => {
			mBody.append(`$builder.add("${property.name}", ((_BaseDataImpl) ${property.name}).data);`, NL);
			mBody.append('return this;', NL);
		});
		node.append('}', NL, NL);

		node.append(
			`public ${t.name}.PatchBuilder ${property.name}(${List}<${type}> additions, ${List}<${baseType}.Patch> updates, ${List}<String> removals) {`,
			NL,
		);
		node.indent(mBody => {
			mBody.append(`var $changeBuilder = Json.createObjectBuilder();`, NL);
			mBody.append(`$changeBuilder.add("@type", "merge");`, NL);
			mBody.append(
				`$changeBuilder.add("additions", _JsonUtils.toJsonValueArray(additions, $e -> ((_BaseDataImpl) $e).data));`,
				NL,
			);
			mBody.append(
				'$changeBuilder.add("updates", _JsonUtils.toJsonValueArray(updates, $e -> ((_BaseDataImpl) $e).data));',
				NL,
			);
			mBody.append('$changeBuilder.add("removals", _JsonUtils.toJsonStringArray(removals));', NL);
			mBody.append(`$builder.add("${property.name}", $changeBuilder.build());`, NL);
			mBody.append('return this;', NL);
		});

		node.append('}', NL, NL);
		node.append(
			toNode([
				//
				`public ${t.name}.PatchBuilder ${property.name}(List<${type}> elements) {`,
				[
					//
					'var $changeBuilder = Json.createObjectBuilder();',
					'$changeBuilder.add("@type", "replace");',
					'$changeBuilder.add("elements", _JsonUtils.toJsonValueArray(elements, $e -> ((_BaseDataImpl) $e).data));',
					`$builder.add("${property.name}", $changeBuilder.build());`,
					'return this;',
				],
				'}',
			]),
		);
	}
	return node;
}

export function generatePatchBuilderPropertyAccessor(
	t: MResolvedRecordType,
	property: MResolvedPropery,
	nativeTypeSubstitues: Record<string, string> | undefined,
	basePackageName: string,
	fqn: (type: string) => string,
) {
	if (property.array) {
		return generatePatchBuilderPropertyAccessor_Array(t, property, nativeTypeSubstitues, basePackageName, fqn);
	} else {
		return generatePatchBuilderPropertyAccessor_Scalar(t, property, nativeTypeSubstitues, basePackageName, fqn);
	}
}

export function generatePatchBuilderPropertyAccessor_Scalar(
	t: MResolvedRecordType,
	property: MResolvedPropery,
	nativeTypeSubstitues: Record<string, string> | undefined,
	basePackageName: string,
	fqn: (type: string) => string,
) {
	const node = new CompositeGeneratorNode();
	if (
		property.variant === 'builtin' ||
		property.variant === 'enum' ||
		property.variant === 'inline-enum' ||
		property.variant === 'scalar'
	) {
		node.append(
			generatePatchBuilderPropertyAccessor_NoRecord_Scalar(t, property, nativeTypeSubstitues, basePackageName, fqn),
		);
	} else {
		node.append(RecordPatchBuilderMethods(t, property, basePackageName, fqn));
	}
	return node;
}

function RecordPatchBuilderMethods(
	t: MResolvedRecordType,
	property: MResolvedPropery,
	basePackageName: string,
	fqn: (type: string) => string,
) {
	const type = fqn(`${basePackageName}.${property.type}`);
	const nullSupport = () => {
		if (property.optional || property.nullable) {
			return toNode([
				`if (${property.name} == null) {`,
				[`$builder.addNull("${property.name}");`, 'return this;'],
				'}',
			]);
		}
		return undefined;
	};
	const withContent = () => {
		if (isMResolvedUnionType(property.resolved.resolvedObjectType)) {
			const dataBuilders = property.resolved.resolvedObjectType.types.flatMap((e, idx) => {
				const Type = fqn(`${basePackageName}.${e}`);
				const start =
					idx === 0 ? `if (clazz == ${Type}.DataBuilder.class) {` : `} else if (clazz == ${Type}.DataBuilder.class) {`;
				return [start, [`b = ${e}DataImpl.builder();`]];
			});

			const patchBuilders = property.resolved.resolvedObjectType.types.flatMap(e => {
				const Type = fqn(`${basePackageName}.${e}`);
				return [`} else if (clazz == ${Type}.PatchBuilder.class) {`, [`b = ${e}PatchImpl.builder();`]];
			});

			return toNode([
				...dataBuilders,
				...patchBuilders,
				'} else {',
				['throw new IllegalArgumentException("Unsupported builder type %s".formatted(clazz));'],
				'}',
			]);
		}
		return toNode([
			`if(clazz == ${property.type}.DataBuilder ) {`,
			[`b = ${property.type}DataImpl.builder();`],
			`} else if (clazz == ${property.type}.PatchBuilder ) {`,
			[`b = ${property.type}PatchImpl.builder();`],
			'} else {',
			['throw new IllegalArgumentException("Unsupported builder type %s".formatted(clazz));'],
			'}',
		]);
	};

	const Function = fqn('java.util.function.Function');
	return toNode([
		'@Override',
		`public ${t.name}.PatchBuilder ${property.name}(${type} ${property.name}) {`,
		[nullSupport, `$builder.add("${property.name}", ((_BaseDataImpl) ${property.name}).data);`, 'return this;'],
		'}',
		'',
		`public <T extends ${type}.Builder> ${t.name}.PatchBuilder with${toFirstUpper(property.name)}(Class<T> clazz, ${Function}<T, ${type}> block) {`,
		[`${property.type}.Builder b;`, withContent, `return repeat(block.apply(clazz.cast(b)));`],
		'}',
	]);
}

export function builtinOptJSONAccess(property: { type: MBuiltinType; name: string }): string {
	switch (property.type) {
		case 'boolean':
			return `_JsonUtils.mapOptBoolean(data, "${property.name}")`;
		case 'double':
			return `_JsonUtils.mapOptDouble(data, "${property.name}")`;
		case 'float':
			return `_JsonUtils.mapOptFloat(data, "${property.name}")`;
		case 'int':
			return `_JsonUtils.mapOptInt(data, "${property.name}")`;
		case 'local-date':
			return `_JsonUtils.mapOptLocalDate(data, "${property.name}")`;
		case 'local-date-time':
			return `_JsonUtils.mapOptLocalDateTime(data, "${property.name}")`;
		case 'long':
			return `_JsonUtils.mapOptLong(data, "${property.name}")`;
		case 'short':
			return `_JsonUtils.mapOptShort(data, "${property.name}")`;
		case 'string':
			return `_JsonUtils.mapOptString(data, "${property.name}")`;
		case 'zoned-date-time':
			return `_JsonUtils.mapOptZonedDateTime(data, "${property.name}")`;
	}
}

export function builtinOptArrayJSONAccess(property: { type: MBuiltinType; name: string }): string {
	switch (property.type) {
		case 'boolean':
			return `_JsonUtils.mapOptBooleans(data, "${property.name}")`;
		case 'double':
			return `_JsonUtils.mapOptDoubles(data, "${property.name}")`;
		case 'float':
			return `_JsonUtils.mapOptFloats(data, "${property.name}")`;
		case 'int':
			return `_JsonUtils.mapOptInts(data, "${property.name}")`;
		case 'local-date':
			return `_JsonUtils.mapOptLocalDates(data, "${property.name}")`;
		case 'local-date-time':
			return `_JsonUtils.mapOptLocalDateTimes(data, "${property.name}")`;
		case 'long':
			return `_JsonUtils.mapOptLongs(data, "${property.name}")`;
		case 'short':
			return `_JsonUtils.mapOptShorts(data, "${property.name}")`;
		case 'string':
			return `_JsonUtils.mapOptStrings(data, "${property.name}")`;
		case 'zoned-date-time':
			return `_JsonUtils.mapOptZonedDateTimes(data, "${property.name}")`;
	}
}

export function builtinNilJSONAccess(property: { type: MBuiltinType; name: string }): string {
	switch (property.type) {
		case 'boolean':
			return `_JsonUtils.mapNilBoolean(data, "${property.name}")`;
		case 'double':
			return `_JsonUtils.mapNilDouble(data, "${property.name}")`;
		case 'float':
			return `_JsonUtils.mapNilFloat(data, "${property.name}")`;
		case 'int':
			return `_JsonUtils.mapNilInt(data, "${property.name}")`;
		case 'local-date':
			return `_JsonUtils.mapNilLocalDate(data, "${property.name}")`;
		case 'local-date-time':
			return `_JsonUtils.mapNilLocalDateTime(data, "${property.name}")`;
		case 'long':
			return `_JsonUtils.mapNilLong(data, "${property.name}")`;
		case 'short':
			return `_JsonUtils.mapNilShort(data, "${property.name}")`;
		case 'string':
			return `_JsonUtils.mapNilString(data, "${property.name}")`;
		case 'zoned-date-time':
			return `_JsonUtils.mapNilZonedDateTime(data, "${property.name}")`;
	}
}

export function builtinNilArrayJSONAccess(property: { type: MBuiltinType; name: string }): string {
	switch (property.type) {
		case 'boolean':
			return `_JsonUtils.mapNilBooleans(data, "${property.name}")`;
		case 'double':
			return `_JsonUtils.mapNilDoubles(data, "${property.name}")`;
		case 'float':
			return `_JsonUtils.mapNilFloats(data, "${property.name}")`;
		case 'int':
			return `_JsonUtils.mapNilInts(data, "${property.name}")`;
		case 'local-date':
			return `_JsonUtils.mapNilLocalDates(data, "${property.name}")`;
		case 'local-date-time':
			return `_JsonUtils.mapNilLocalDateTimes(data, "${property.name}")`;
		case 'long':
			return `_JsonUtils.mapNilLongs(data, "${property.name}")`;
		case 'short':
			return `_JsonUtils.mapNilShorts(data, "${property.name}")`;
		case 'string':
			return `_JsonUtils.mapNilStrings(data, "${property.name}")`;
		case 'zoned-date-time':
			return `_JsonUtils.mapNilZonedDateTimes(data, "${property.name}")`;
	}
}
