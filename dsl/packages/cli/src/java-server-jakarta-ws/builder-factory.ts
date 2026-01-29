import { CompositeGeneratorNode, NL, toString } from 'langium/generate';
import { Artifact } from '../artifact-generator.js';
import {
	generateCompilationUnit,
	JavaImportsCollector,
	JavaServerJakartaWSGeneratorConfig,
	toPath,
} from '../java-gen-utils.js';
import { isMResolvedRecordType, isMResolvedUnionType, MResolvedRSDModel } from '../model.js';
import { hasFileStream, hasStream } from '../util.js';

export function generateDTOBuilderFactory(
	model: MResolvedRSDModel,
	artifactConfig: JavaServerJakartaWSGeneratorConfig,
): Artifact {
	const packageName = `${artifactConfig.rootPackageName}.rest`;

	const importCollector = new JavaImportsCollector(packageName);
	const fqn = importCollector.importType.bind(importCollector);

	return {
		name: 'RestBuilderFactory.java',
		content: toString(
			generateCompilationUnit(
				packageName,
				importCollector,
				generateDTOBuilderFactoryContent(model, artifactConfig, fqn),
			),
			'\t',
		),
		path: toPath(artifactConfig.targetFolder, packageName),
	};
}

function generateDTOBuilderFactoryContent(
	model: MResolvedRSDModel,
	artifactConfig: JavaServerJakartaWSGeneratorConfig,
	fqn: (type: string) => string,
) {
	const node = new CompositeGeneratorNode();

	const Singleton = fqn('jakarta.inject.Singleton');
	const DTOBuilderFactory = fqn(`${artifactConfig.rootPackageName}.service.BuilderFactory`);
	const Base = fqn(`${artifactConfig.rootPackageName}.service.model._Base`);
	const List = fqn('java.util.List');

	node.append(`@${Singleton}`, NL);
	node.append(`public class RestBuilderFactory implements ${DTOBuilderFactory} {`, NL);
	node.indent(body => {
		body.append('@Override', NL);
		body.append(`public <T extends ${Base}.BaseDataBuilder<?>> T builder(Class<T> type) {`, NL);
		body.indent(mBody => {
			mBody.append(generateBuilderMethodBody(model, artifactConfig, fqn));
		});
		body.append('}', NL, NL);
		body.append('public <T extends _Base.BaseData> T of(Class<T> type, String data) {', NL);
		body.indent(mBody => {
			mBody.append(generateOfMethodBody(model, artifactConfig, fqn));
		});
		body.append('}', NL, NL);
		body.append('@SuppressWarnings("unchecked")', NL);
		body.append(`public <T extends _Base.BaseData> ${List}<T> listOf(Class<T> type, String data) {`, NL);
		body.indent(mBody => {
			mBody.append(generateListOfMethodBody(model, artifactConfig, fqn));
		});
		body.append('}', NL);

		if (hasStream(model)) {
			body.appendNewLine();
			body.append(
				`public ${fqn(`${artifactConfig.rootPackageName}.service.model.RSDBlob`)} createBlob(${fqn('java.nio.file.Path')} file, String mimeType) {`,
				NL,
			);
			body.indent(mBody => {
				const BlobImpl = fqn(`${artifactConfig.rootPackageName}.rest.model._BlobImpl`);
				mBody.append(`return ${BlobImpl}.of(file, mimeType);`, NL);
			});
			body.append('}', NL);

			if (hasFileStream(model)) {
				body.appendNewLine();
				body.append(
					`public ${fqn(`${artifactConfig.rootPackageName}.service.model.RSDFile`)} createFile(${fqn(
						'java.nio.file.Path',
					)} file, String mimeType, String filename) {`,
					NL,
				);
				body.indent(mBody => {
					const FileImpl = fqn(`${artifactConfig.rootPackageName}.rest.model._FileImpl`);
					mBody.append(`return ${FileImpl}.of(file, mimeType, filename);`, NL);
				});
				body.append('}', NL);
			}
		}
	});
	node.append('}', NL);

	return node;
}

function generateBuilderMethodBody(
	model: MResolvedRSDModel,
	artifactConfig: JavaServerJakartaWSGeneratorConfig,
	fqn: (type: string) => string,
) {
	const mBody = new CompositeGeneratorNode();
	model.elements.filter(isMResolvedRecordType).forEach(t => {
		const InterfaceType = fqn(`${artifactConfig.rootPackageName}.service.model.${t.name}`);
		const ImplType = fqn(`${artifactConfig.rootPackageName}.rest.model.${t.name}DataImpl`);
		mBody.append(`if (type == ${InterfaceType}.DataBuilder.class) {`, NL);
		mBody.indent(block => {
			block.append(`return type.cast(${ImplType}.builder());`, NL);
		});
		mBody.append('}', NL);
		if (t.patchable) {
			const PatchImplType = fqn(`${artifactConfig.rootPackageName}.rest.model.${t.name}PatchImpl`);
			mBody.append(`if (type == ${InterfaceType}.PatchBuilder.class) {`, NL);
			mBody.indent(block => {
				block.append(`return type.cast(${PatchImplType}.builder());`, NL);
			});
			mBody.append('}', NL);
		}
	});
	mBody.append('throw new IllegalArgumentException("Unsupported Builder \'%s\'".formatted(type));', NL);
	return mBody;
}

function generateOfMethodBody(
	model: MResolvedRSDModel,
	artifactConfig: JavaServerJakartaWSGeneratorConfig,
	fqn: (type: string) => string,
) {
	const _JsonUtils = fqn(`${artifactConfig.rootPackageName}.rest.model._JsonUtils`);
	const mBody = new CompositeGeneratorNode();
	model.elements
		.filter(isMResolvedRecordType)
		//.filter(t => t.resolved.unions.length !== 1)
		.forEach(t => {
			const InterfaceType = fqn(`${artifactConfig.rootPackageName}.service.model.${t.name}`);
			const ImplType = fqn(`${artifactConfig.rootPackageName}.rest.model.${t.name}DataImpl`);
			mBody.append(`if (type == ${InterfaceType}.Data.class) {`, NL);
			mBody.indent(block => {
				block.append(`return type.cast(${_JsonUtils}.parseJsonObject(data, ${ImplType}::of));`, NL);
			});
			mBody.append('}', NL);
			if (t.patchable) {
				const InterfaceType = fqn(`${artifactConfig.rootPackageName}.service.model.${t.name}`);
				const ImplType = fqn(`${artifactConfig.rootPackageName}.rest.model.${t.name}PatchImpl`);
				mBody.append(`if (type == ${InterfaceType}.Patch.class) {`, NL);
				mBody.indent(block => {
					block.append(`return type.cast(${_JsonUtils}.parseJsonObject(data, ${ImplType}::of));`, NL);
				});
				mBody.append('}', NL);
			}
		});
	model.elements.filter(isMResolvedUnionType).forEach(u => {
		const InterfaceType = fqn(`${artifactConfig.rootPackageName}.service.model.${u.name}`);
		const ImplType = fqn(`${artifactConfig.rootPackageName}.rest.model.${u.name}DataImpl`);
		mBody.append(`if (type == ${InterfaceType}.Data.class) {`, NL);
		mBody.indent(block => {
			block.append(`return type.cast(${_JsonUtils}.parseJsonObject(data, ${ImplType}::of));`, NL);
		});
		mBody.append('}', NL);
		if (u.resolved.records.find(r => r.patchable)) {
			const InterfaceType = fqn(`${artifactConfig.rootPackageName}.service.model.${u.name}`);
			const ImplType = fqn(`${artifactConfig.rootPackageName}.rest.model.${u.name}PatchImpl`);
			mBody.append(`if (type == ${InterfaceType}.Patch.class) {`, NL);
			mBody.indent(block => {
				block.append(`return type.cast(${_JsonUtils}.parseJsonObject(data, ${ImplType}::of));`, NL);
			});
			mBody.append('}', NL);
		}
	});
	mBody.append(NL);
	mBody.append('throw new IllegalArgumentException("Unsupported Builder \'%s\'".formatted(type));', NL);
	return mBody;
}

function generateListOfMethodBody(
	model: MResolvedRSDModel,
	artifactConfig: JavaServerJakartaWSGeneratorConfig,
	fqn: (type: string) => string,
) {
	const _JsonUtils = fqn(`${artifactConfig.rootPackageName}.rest.model._JsonUtils`);
	const mBody = new CompositeGeneratorNode();
	model.elements
		.filter(isMResolvedRecordType)
		//.filter(t => t.resolved.unions.length !== 1)
		.forEach(t => {
			const InterfaceType = fqn(`${artifactConfig.rootPackageName}.service.model.${t.name}`);
			const ImplType = fqn(`${artifactConfig.rootPackageName}.rest.model.${t.name}DataImpl`);
			mBody.append(`if (type == ${InterfaceType}.Data.class) {`, NL);
			mBody.indent(block => {
				block.append(`return (List<T>) ${_JsonUtils}.parseJsonArray(data, ${ImplType}::of);`, NL);
			});
			mBody.append('}', NL);
			if (t.patchable) {
				const InterfaceType = fqn(`${artifactConfig.rootPackageName}.service.model.${t.name}`);
				const ImplType = fqn(`${artifactConfig.rootPackageName}.rest.model.${t.name}PatchImpl`);
				mBody.append(`if (type == ${InterfaceType}.Patch.class) {`, NL);
				mBody.indent(block => {
					block.append(`return (List<T>) ${_JsonUtils}.parseJsonArray(data, ${ImplType}::of);`, NL);
				});
				mBody.append('}', NL);
			}
		});
	model.elements.filter(isMResolvedUnionType).forEach(u => {
		const InterfaceType = fqn(`${artifactConfig.rootPackageName}.service.model.${u.name}`);
		const ImplType = fqn(`${artifactConfig.rootPackageName}.rest.model.${u.name}DataImpl`);
		mBody.append(`if (type == ${InterfaceType}.Data.class) {`, NL);
		mBody.indent(block => {
			block.append(`return (List<T>) ${_JsonUtils}.parseJsonArray(data, ${ImplType}::of);`, NL);
		});
		mBody.append('}', NL);
		if (u.resolved.records.find(r => r.patchable)) {
			const InterfaceType = fqn(`${artifactConfig.rootPackageName}.service.model.${u.name}`);
			const ImplType = fqn(`${artifactConfig.rootPackageName}.rest.model.${u.name}PatchImpl`);
			mBody.append(`if (type == ${InterfaceType}.Patch.class) {`, NL);
			mBody.indent(block => {
				block.append(`return (List<T>) ${_JsonUtils}.parseJsonArray(data, ${ImplType}::of);`, NL);
			});
			mBody.append('}', NL);
		}
	});
	mBody.append(NL);
	mBody.append('throw new IllegalArgumentException("Unsupported Builder \'%s\'".formatted(type));', NL);
	return mBody;
}
