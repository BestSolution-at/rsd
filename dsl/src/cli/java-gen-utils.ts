import { CompositeGeneratorNode, NL } from "langium/generate";
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

export class JavaImportsCollector {
    private importedTypes = new Map<string,string>();
    private importedPackages = new Map<string, Set<string>>();

    constructor(private sourcePackage: string) {}

    public appendImportGroups(node: CompositeGeneratorNode) {
        this.importGroups().forEach( (g,idx) => {
            g.imports.forEach( i => {
                node.append(`import ${i};`, NL);
            })
            node.appendNewLine();
        } )
    }

    public importGroups(): ImportGroup[] {
        const result: ImportGroup[] = [];
        
        const allImports = [...this.importedPackages.entries()];

        const javaFilter = (e: [ string, Set<string> ]) => e[0].startsWith('java.') || e[0].startsWith('javax.');
        const jakartaFilter = (e: [ string, Set<string> ]) => e[0].startsWith('jakarta.');
        const otherFilter = (e: [ string, Set<string> ]) => !javaFilter(e) && !jakartaFilter(e);

        const typeFlatMap = (e: [ string, Set<string> ]) => [...e[1].values()]

        const javaGroup : ImportGroup = {
            imports: allImports
                .filter(javaFilter)
                .flatMap(typeFlatMap)
                .sort((a,b) => a.localeCompare(b))
        }
        const jakartaGroup: ImportGroup = {
            imports: allImports
                .filter(jakartaFilter)
                .flatMap(typeFlatMap)
                .sort((a,b) => a.localeCompare(b))
        }
        const other: ImportGroup = {
            imports: allImports
                .filter(otherFilter)
                .flatMap(typeFlatMap)
                .sort((a,b) => a.localeCompare(b))
        }
        if(javaGroup.imports.length > 0) {
            result.push(javaGroup)
        }
        if(jakartaGroup.imports.length > 0) {
            result.push(jakartaGroup)
        }
        if(other.imports.length > 0) {
            result.push(other);
        }
        return result;
    }

    public importType(fqnType: string) {
        const lastIdx = fqnType.lastIndexOf('.');
        const pkg = fqnType.substring(0,lastIdx)
        const type = fqnType.substring(lastIdx+1);
        
        if(! this.importedTypes.has(type) ) {
            // Not yet imported good - remember
            this.importedTypes.set(type, pkg)
        } else if( pkg !== this.importedTypes.get(type) ) {
            // Another type of the same name has been imported need to stay fqnType
            return fqnType;
        }

        // Same package no import needed
        if( pkg === this.sourcePackage ) {
            return type;
        }

        let imports = this.importedPackages.get(pkg);
        if( imports === undefined ) {
            imports = new Set()
            this.importedPackages.set(pkg, imports);
        }
        imports.add(fqnType);
        return type;
    }
}

export type ImportGroup = {
    readonly imports: readonly string[]
}