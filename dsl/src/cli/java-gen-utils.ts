import { CompositeGeneratorNode, NL } from 'langium/generate';
import {
  ArtifactGenerationConfig,
  ArtifactGeneratorConfig,
} from './artifact-generator.js';
import {
  MBuiltinType,
  MParameter,
  MResolvedBaseProperty,
  isMBuiltinType,
  isMInlineEnumType,
  isMKeyProperty,
  isMMixinType,
  isMRevisionProperty,
} from './model.js';
import { toFirstUpper } from './util.js';

export function builtinToJavaType(
  type: MBuiltinType,
  fqn: (type: string) => string
): string {
  switch (type) {
    case 'boolean':
      return 'boolean';
    case 'double':
      return 'double';
    case 'float':
      return 'float';
    case 'int':
      return 'int';
    case 'local-date':
      return fqn('java.time.LocalDate');
    case 'local-date-time':
      return fqn('java.time.LocalDateTime');
    case 'long':
      return 'long';
    case 'short':
      return 'short';
    case 'string':
      return 'String';
    case 'zoned-date-time':
      return fqn('java.time.ZonedDateTime');
  }
}

export function builtinToJavaObjectType(
  type: MBuiltinType,
  fqn: (type: string) => string
): string {
  switch (type) {
    case 'boolean':
      return 'Boolean';
    case 'double':
      return 'Double';
    case 'float':
      return 'Float';
    case 'int':
      return 'Integer';
    case 'local-date':
      return fqn('java.time.LocalDate');
    case 'local-date-time':
      return fqn('java.time.LocalDateTime');
    case 'long':
      return 'Long';
    case 'short':
      return 'Short';
    case 'string':
      return 'String';
    case 'zoned-date-time':
      return fqn('java.time.ZonedDateTime');
  }
}

export function resolveType(
  type: string,
  nativeSubstitutes: Record<string, string> | undefined,
  fqn: (type: string) => string,
  useBuiltinObject: boolean
) {
  if (isMBuiltinType(type)) {
    if (useBuiltinObject) {
      return builtinToJavaObjectType(type, fqn);
    }
    return builtinToJavaType(type, fqn);
  } else if (nativeSubstitutes !== undefined && type in nativeSubstitutes) {
    return fqn(nativeSubstitutes[type]);
  }
  return type;
}

export function resolveObjectType(
  type: string,
  nativeSubstitutes: Record<string, string> | undefined,
  fqn: (type: string) => string
) {
  if (isMBuiltinType(type)) {
    return builtinToJavaObjectType(type, fqn);
  } else if (nativeSubstitutes !== undefined && type in nativeSubstitutes) {
    return fqn(nativeSubstitutes[type]);
  }
  return type;
}

export function computeParameterAPIType(
  parameter: MParameter,
  nativeTypeSubstitues: Record<string, string> | undefined,
  basePackageName: string,
  fqn: (type: string) => string,
  noArray = false
) {
  let type: string;
  if (isMBuiltinType(parameter.type)) {
    if (parameter.array || parameter.optional) {
      type = builtinToJavaObjectType(parameter.type, fqn);
    } else {
      type = builtinToJavaType(parameter.type, fqn);
    }
  } else if (isMInlineEnumType(parameter.type)) {
    throw new Error('Should not get here');
  } else {
    if (parameter.variant === 'enum' || parameter.variant === 'scalar') {
      if (
        nativeTypeSubstitues !== undefined &&
        parameter.type in nativeTypeSubstitues
      ) {
        type = fqn(nativeTypeSubstitues[parameter.type]);
      } else {
        type = fqn(`${basePackageName}.${parameter.type}`);
      }
    } else if (
      parameter.variant === 'record' ||
      parameter.variant === 'union'
    ) {
      type = fqn(`${basePackageName}.${parameter.type}`) + '.Data';
    } else {
      throw new Error('Should not get here');
    }
  }
  if (parameter.array && !noArray) {
    return `${fqn('java.util.List')}<${type}>`;
  }
  return type;
}

export function computeAPIType(
  property: MResolvedBaseProperty,
  nativeTypeSubstitues: Record<string, string> | undefined,
  basePackageName: string,
  fqn: (type: string) => string,
  noArray = false
): string {
  if (isMKeyProperty(property)) {
    return builtinToJavaType(property.type, fqn);
  }
  if (isMRevisionProperty(property)) {
    return builtinToJavaType(property.type, fqn);
  }

  let type: string;

  if (isMBuiltinType(property.type)) {
    if (property.array || property.optional) {
      type = builtinToJavaObjectType(property.type, fqn);
    } else {
      type = builtinToJavaType(property.type, fqn);
    }
  } else if (isMInlineEnumType(property.type)) {
    if (isMMixinType(property.resolved.owner)) {
      type =
        fqn(`${basePackageName}.mixins.${property.resolved.owner.name}Mixin`) +
        '.' +
        toFirstUpper(property.name);
    } else {
      type =
        fqn(`${basePackageName}.${property.resolved.owner.name}`) +
        +'.' +
        toFirstUpper(property.name);
    }
  } else {
    if (property.variant === 'enum' || property.variant === 'scalar') {
      if (
        nativeTypeSubstitues !== undefined &&
        property.type in nativeTypeSubstitues
      ) {
        type = fqn(nativeTypeSubstitues[property.type]);
      } else {
        type = fqn(`${basePackageName}.${property.type}`);
      }
    } else if (property.variant === 'record' || property.variant === 'union') {
      type = fqn(`${basePackageName}.${property.type}`) + '.Data';
    } else {
      throw new Error('Should not get here');
    }
  }

  if (property.array && !noArray) {
    return `${fqn('java.util.List')}<${type}>`;
  }
  return type;
}

export function toPath(targetFolder: string, packageName: string) {
  return `${targetFolder}/${packageName.replaceAll('.', '/')}`;
}

export type JavaClientAPIGeneratorConfig = ArtifactGenerationConfig & {
  targetFolder: string;
  rootPackageName: string;
  nativeTypeSubstitues?: Record<string, string>;
};

export type JavaRestClientJDKGeneratorConfig = ArtifactGenerationConfig & {
  targetFolder: string;
  rootPackageName: string;
  nativeTypeSubstitues?: Record<string, string>;
};

export type JavaServerJakartaWSGeneratorConfig = ArtifactGenerationConfig & {
  targetFolder: string;
  rootPackageName: string;
  nativeTypeSubstitues?: Record<string, string>;
};

export type JavaServerGeneratorConfig = ArtifactGenerationConfig & {
  targetFolder: string;
  rootPackageName: string;
  nativeTypeSubstitues?: Record<string, string>;
};

export function isJavaClientAPIGeneratorConfig(
  config: ArtifactGeneratorConfig
): config is JavaClientAPIGeneratorConfig {
  return (
    'targetFolder' in config &&
    typeof config.targetFolder === 'string' &&
    'rootPackageName' in config &&
    typeof config.rootPackageName === 'string'
  );
}

export function isJavaRestClientJDKGeneratorConfig(
  config: ArtifactGeneratorConfig
): config is JavaRestClientJDKGeneratorConfig {
  return (
    'targetFolder' in config &&
    typeof config.targetFolder === 'string' &&
    'rootPackageName' in config &&
    typeof config.rootPackageName === 'string'
  );
}

export function isJavaServerJakartaWSConfig(
  config: ArtifactGeneratorConfig
): config is JavaServerJakartaWSGeneratorConfig {
  return (
    'targetFolder' in config &&
    typeof config.targetFolder === 'string' &&
    'rootPackageName' in config &&
    typeof config.rootPackageName === 'string'
  );
}

export function isJavaServerConfig(
  config: ArtifactGeneratorConfig
): config is JavaServerGeneratorConfig {
  return (
    'targetFolder' in config &&
    typeof config.targetFolder === 'string' &&
    'rootPackageName' in config &&
    typeof config.rootPackageName === 'string'
  );
}

export function generateCompilationUnit(
  packageName: string,
  importCollector: JavaImportsCollector,
  content: CompositeGeneratorNode
) {
  const node = new CompositeGeneratorNode();
  node.append('// Generated by RSD - Do not modify', NL);
  node.append(`package ${packageName};`, NL, NL);
  importCollector.appendImportGroups(node);
  node.append(content);
  return node;
}

export class JavaImportsCollector {
  private importedTypes = new Map<string, string>();
  private importedPackages = new Map<string, Set<string>>();

  constructor(private sourcePackage: string) {}

  public appendImportGroups(node: CompositeGeneratorNode) {
    this.importGroups().forEach((g, idx) => {
      g.imports.forEach((i) => {
        node.append(`import ${i};`, NL);
      });
      node.appendNewLine();
    });
  }

  public importGroups(): ImportGroup[] {
    const result: ImportGroup[] = [];

    const allImports = [...this.importedPackages.entries()];

    const javaFilter = (e: [string, Set<string>]) =>
      e[0].startsWith('java.') || e[0].startsWith('javax.');
    const jakartaFilter = (e: [string, Set<string>]) =>
      e[0].startsWith('jakarta.');
    const otherFilter = (e: [string, Set<string>]) =>
      !javaFilter(e) && !jakartaFilter(e);

    const typeFlatMap = (e: [string, Set<string>]) => [...e[1].values()];

    const javaGroup: ImportGroup = {
      imports: allImports
        .filter(javaFilter)
        .flatMap(typeFlatMap)
        .sort((a, b) => a.localeCompare(b)),
    };
    const jakartaGroup: ImportGroup = {
      imports: allImports
        .filter(jakartaFilter)
        .flatMap(typeFlatMap)
        .sort((a, b) => a.localeCompare(b)),
    };
    const other: ImportGroup = {
      imports: allImports
        .filter(otherFilter)
        .flatMap(typeFlatMap)
        .sort((a, b) => a.localeCompare(b)),
    };
    if (javaGroup.imports.length > 0) {
      result.push(javaGroup);
    }
    if (jakartaGroup.imports.length > 0) {
      result.push(jakartaGroup);
    }
    if (other.imports.length > 0) {
      result.push(other);
    }
    return result;
  }

  public importType(fqnType: string) {
    const lastIdx = fqnType.lastIndexOf('.');
    const pkg = fqnType.substring(0, lastIdx);
    const type = fqnType.substring(lastIdx + 1);

    if (!this.importedTypes.has(type)) {
      // Not yet imported good - remember
      this.importedTypes.set(type, pkg);
    } else if (pkg !== this.importedTypes.get(type)) {
      // Another type of the same name has been imported need to stay fqnType
      return fqnType;
    }

    // Same package no import needed
    if (pkg === this.sourcePackage) {
      return type;
    }

    let imports = this.importedPackages.get(pkg);
    if (imports === undefined) {
      imports = new Set();
      this.importedPackages.set(pkg, imports);
    }
    imports.add(fqnType);
    return type;
  }
}

export type ImportGroup = {
  readonly imports: readonly string[];
};
