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

export function reolveType(type: string, nativeSubstitutes: Record<string,string> | undefined) {
    if( isMBuiltinType(type) ) {
        return builtinToJavaType(type);
    } else if( nativeSubstitutes !== undefined && type in nativeSubstitutes ) {
        return nativeSubstitutes[type];
    }
    return type;
}