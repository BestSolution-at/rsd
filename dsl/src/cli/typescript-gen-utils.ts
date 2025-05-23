import { CompositeGeneratorNode, NL } from 'langium/generate';
import { ArtifactGeneratorConfig } from './artifact-generator.js';
import { MBuiltinType } from './model.js';

export type TypescriptClientAPIGeneratorConfig = ArtifactGeneratorConfig & {
  targetFolder: string;
};

export function isTypescriptClientAPIGeneratorConfig(
  config: ArtifactGeneratorConfig
): config is TypescriptClientAPIGeneratorConfig {
  return 'targetFolder' in config && typeof config.targetFolder === 'string';
}

export type TypescriptFetchClientGeneratorConfig = ArtifactGeneratorConfig & {
  targetFolder: string;
  apiNamespacePath: string;
};

export function isTypescriptFetchClientGeneratorConfig(
  config: ArtifactGeneratorConfig
): config is TypescriptFetchClientGeneratorConfig {
  return 'targetFolder' in config && typeof config.targetFolder === 'string';
}

export class TypescriptImportCollector {
  private aliasCount = 0;
  private readonly fqnTypes = new Map<string, string>();
  private readonly importTypes = new Map<string, Set<string>>();

  constructor() {}

  importType(type: string) {
    const parts = type.split(':');
    return this._importType(parts[0], parts[1]);
  }

  public appendImportGroups(node: CompositeGeneratorNode) {
    this.importTypes.forEach((v, p) => {
      node.append(
        `import { ${[...v]
          .sort((a, b) => a.localeCompare(b))
          .join(', ')} } from '${p}';`,
        NL
      );
    });

    node.appendNewLineIf(this.importTypes.size > 0);
  }

  private _importType(type: string, path: string) {
    let resultType = type;
    if (this.fqnTypes.get(type) == null) {
      this.fqnTypes.set(type, path);
    } else if (path !== this.fqnTypes.get(type)) {
      resultType = type + '' + this.aliasCount++;
      type = type + ' as ' + resultType;
    }

    const types = this.importTypes.get(path) ?? new Set();
    this.importTypes.set(path, types);
    types.add(type);
    return resultType;
  }
}

export function generateCompilationUnit(
  importCollector: TypescriptImportCollector,
  content: CompositeGeneratorNode
) {
  const node = new CompositeGeneratorNode();
  node.append('// Generated by RSD - Do not modify', NL);
  importCollector.appendImportGroups(node);
  node.append(content);
  return node;
}

export function builtinToJSType(type: MBuiltinType) {
  if (type === 'boolean') {
    return 'boolean';
  } else if (
    type === 'double' ||
    type === 'float' ||
    type === 'int' ||
    type === 'long' ||
    type === 'short'
  ) {
    return 'number';
  } else {
    return 'string';
  }
}
