import { IndentNode, NL } from "langium/generate"

import { MKeyProperty, MProperty, MRevisionProperty, isMKeyProperty, isMRevisionProperty } from "../model.js"
import { JavaRestClientAPIGeneratorConfig, builtinToJavaType, resolveObjectType, resolveType } from "../java-gen-utils.js"
import { toFirstUpper } from "../util.js"

export function generateBuilderProperty(node: IndentNode, property: MKeyProperty | MRevisionProperty | MProperty, artifactConfig: JavaRestClientAPIGeneratorConfig) {
    if( isMKeyProperty(property) ) {
        node.append(`public Builder ${property.name}(${builtinToJavaType(property.type)} ${property.name});`,NL)
    } else if( isMRevisionProperty(property) ) {
        node.append(`public Builder ${property.name}(${builtinToJavaType(property.type)} ${property.name});`,NL)
    } else {
        if( property.variant === 'union' || property.variant === 'record' ) {
            if( property.array ) {
                node.append(`public Builder ${property.name}(java.util.List<${property.type}DTO> ${property.name});`,NL)
            } else {
                node.append(`public Builder ${property.name}(${property.type}DTO ${property.name});`,NL)
            }
        } else if( typeof property.type === 'string' ) {
            if( property.array ) {
                node.append(`public Builder ${property.name}(java.util.List<${resolveObjectType(property.type, artifactConfig.nativeTypeSubstitues)}> ${property.name});`,NL)
            } else {
                node.append(`public Builder ${property.name}(${resolveType(property.type, artifactConfig.nativeTypeSubstitues)} ${property.name});`,NL)
            }
        } else {
            node.append(`public Builder ${property.name}(${toFirstUpper(property.name)} ${property.name});`,NL)
        }
        
    }
}

export function generateProperty(node: IndentNode, property: MKeyProperty | MRevisionProperty | MProperty, artifactConfig: JavaRestClientAPIGeneratorConfig) {
    if( isMKeyProperty(property) ) {
        node.append(`public ${builtinToJavaType(property.type)} ${property.name}();`,NL)
    } else if( isMRevisionProperty(property) ) {
        node.append(`public ${builtinToJavaType(property.type)} ${property.name}();`,NL)
    } else {
        if( property.variant === 'union' || property.variant === 'record' ) {
            if( property.array ) {
                node.append(`public java.util.List<${property.type}DTO> ${property.name}();`,NL)
            } else {
                node.append(`public ${property.type}DTO ${property.name}();`,NL)
            }
        } else if( typeof property.type === 'string' ) {
            if( property.array ) {
                node.append(`public java.util.List<${resolveObjectType(property.type, artifactConfig.nativeTypeSubstitues)}> ${property.name}();`,NL)
            } else {
                node.append(`public ${resolveType(property.type, artifactConfig.nativeTypeSubstitues)} ${property.name}();`,NL)
            }
        } else {
            node.append(`public ${toFirstUpper(property.name)} ${property.name}();`,NL)
        }
        
    }
}