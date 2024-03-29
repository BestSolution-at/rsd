import { ArtifactGenerationConfig, ArtifactGeneratorConfig } from "./artifact-generator.js";
import { MBuiltinType, isMBuiltinType } from "./model.js";

export function builtinToJavaType(type: MBuiltinType): string {
    switch(type) {
        case 'boolean': return 'boolean';
        case 'double': return 'double';
        case 'float': return 'float';
        case 'int': return 'int';
        case 'local-date': return 'java.time.LocalDate';
        case 'local-date-time': return 'java.time.LocalDateTime';
        case 'long': return 'long';
        case 'short': return 'short';
        case 'string': return 'String';
        case 'zoned-date-time': return 'java.time.ZonedDateTime';
    }
}

export function builtinToJavaObjectType(type: MBuiltinType): string {
    switch(type) {
        case 'boolean': return 'Boolean';
        case 'double': return 'Double';
        case 'float': return 'Float';
        case 'int': return 'Integer';
        case 'local-date': return 'java.time.LocalDate';
        case 'local-date-time': return 'java.time.LocalDateTime';
        case 'long': return 'Long';
        case 'short': return 'Short';
        case 'string': return 'String';
        case 'zoned-date-time': return 'java.time.ZonedDateTime';
    }
}

export function resolveType(type: string, nativeSubstitutes: Record<string,string> | undefined) {
    if( isMBuiltinType(type) ) {
        return builtinToJavaType(type);
    } else if( nativeSubstitutes !== undefined && type in nativeSubstitutes ) {
        return nativeSubstitutes[type];
    }
    return type;
}

export function resolveObjectType(type: string, nativeSubstitutes: Record<string,string> | undefined) {
    if( isMBuiltinType(type) ) {
        return builtinToJavaObjectType(type);
    } else if( nativeSubstitutes !== undefined && type in nativeSubstitutes ) {
        return nativeSubstitutes[type];
    }
    return type;
}

export function toPath(targetFolder: string, packageName: string) {
    return `${targetFolder}/${packageName.replaceAll('.','/')}`; 
}

export type JavaRestClientAPIGeneratorConfig = ArtifactGenerationConfig & {
    targetFolder: string
    rootPackageName: string
    nativeTypeSubstitues?: Record<string, string>
}

export function isJavaRestClientAPIGeneratorConfig(config: ArtifactGeneratorConfig): config is JavaRestClientAPIGeneratorConfig {
    return 'targetFolder' in config && typeof config.targetFolder === 'string'
        && 'rootPackageName' in config && typeof config.rootPackageName === 'string';
}
