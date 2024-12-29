import { IndentNode, NL } from "langium/generate";
import {
  isMKeyProperty,
  isMRevisionProperty,
  MKeyProperty,
  MProperty,
  MRevisionProperty,
} from "../model.js";
import {
  builtinToJavaType,
  JavaServerJakartaWSGeneratorConfig,
  resolveObjectType,
  resolveType,
} from "../java-gen-utils.js";
import { toFirstUpper } from "../util.js";

export function generateConstructorProperty(
  node: IndentNode,
  property: MKeyProperty | MRevisionProperty | MProperty,
  end: string,
  artifactConfig: JavaServerJakartaWSGeneratorConfig,
  fqn: (type: string) => string
) {
  if (isMKeyProperty(property)) {
    node.append(
      `${builtinToJavaType(property.type, fqn)} ${property.name}`,
      end,
      NL
    );
  } else if (isMRevisionProperty(property)) {
    node.append(
      `${builtinToJavaType(property.type, fqn)} ${property.name}`,
      end,
      NL
    );
  } else {
    if (property.variant === "union" || property.variant === "record") {
      if (property.array) {
        node.append(
          `${fqn("java.util.List")}<${property.type}DTOImpl> ${property.name}`,
          end,
          NL
        );
      } else {
        node.append(`${property.type}DTOImpl ${property.name}`, end, NL);
      }
    } else if (typeof property.type === "string") {
      if (property.array) {
        node.append(
          `${fqn("java.util.List")}<${resolveObjectType(
            property.type,
            artifactConfig.nativeTypeSubstitues,
            fqn
          )}> ${property.name}`,
          end,
          NL
        );
      } else {
        node.append(
          `${resolveType(
            property.type,
            artifactConfig.nativeTypeSubstitues,
            fqn,
            property.nullable
          )} ${property.name}`,
          end,
          NL
        );
      }
    } else {
      node.append(`${toFirstUpper(property.name)} ${property.name}`, end, NL);
    }
  }
}

export function generateProperty(
  node: IndentNode,
  property: MKeyProperty | MRevisionProperty | MProperty,
  artifactConfig: JavaServerJakartaWSGeneratorConfig,
  fqn: (type: string) => string
) {
  if (isMKeyProperty(property)) {
    node.append(
      `public ${builtinToJavaType(property.type, fqn)} ${property.name};`,
      NL
    );
  } else if (isMRevisionProperty(property)) {
    node.append(
      `public ${builtinToJavaType(property.type, fqn)} ${property.name};`,
      NL
    );
  } else {
    if (property.variant === "union" || property.variant === "record") {
      if (property.array) {
        node.append(
          `public ${fqn("java.util.List")}<${property.type}DTOImpl> ${
            property.name
          };`,
          NL
        );
      } else {
        node.append(`public ${property.type}DTOImpl ${property.name};`, NL);
      }
    } else if (typeof property.type === "string") {
      if (property.array) {
        node.append(
          `public ${fqn("java.util.List")}<${resolveObjectType(
            property.type,
            artifactConfig.nativeTypeSubstitues,
            fqn
          )}> ${property.name};`,
          NL
        );
      } else {
        node.append(
          `public ${resolveType(
            property.type,
            artifactConfig.nativeTypeSubstitues,
            fqn,
            property.nullable
          )} ${property.name};`,
          NL
        );
      }
    } else {
      node.append(
        `public ${toFirstUpper(property.name)} ${property.name};`,
        NL
      );
    }
  }
}

export function generatePropertyAccess(
  node: IndentNode,
  property: MKeyProperty | MRevisionProperty | MProperty,
  artifactConfig: JavaServerJakartaWSGeneratorConfig,
  fqn: (type: string) => string
) {
  node.appendNewLine();
  if (isMKeyProperty(property)) {
    node.append(
      `public ${builtinToJavaType(property.type, fqn)} ${property.name}() {`,
      NL
    );
    node.indent((body) => {
      body.append(`return this.${property.name};`, NL);
    });
    node.append("}", NL);
  } else if (isMRevisionProperty(property)) {
    node.append(
      `public ${builtinToJavaType(property.type, fqn)} ${property.name}() {`,
      NL
    );
    node.indent((body) => {
      body.append(`return this.${property.name};`, NL);
    });
    node.append("}", NL);
  } else {
    if (property.variant === "union" || property.variant === "record") {
      if (property.array) {
        node.append(
          `public ${fqn("java.util.List")}<${property.type}DTO> ${
            property.name
          }() {`,
          NL
        );
        node.indent((body) => {
          body.append(`return this.${property.name};`, NL);
        });
        node.append("}", NL);
      } else {
        node.append(`public ${property.type}DTO ${property.name}() {`, NL);
        node.indent((body) => {
          body.append(`return this.${property.name};`, NL);
        });
        node.append("}", NL);
      }
    } else if (typeof property.type === "string") {
      if (property.array) {
        node.append(
          `public ${fqn("java.util.List")}<${resolveObjectType(
            property.type,
            artifactConfig.nativeTypeSubstitues,
            fqn
          )}> ${property.name}() {`,
          NL
        );
        node.indent((body) => {
          body.append(`return this.${property.name};`, NL);
        });
        node.append("}", NL);
      } else {
        node.append(
          `public ${resolveType(
            property.type,
            artifactConfig.nativeTypeSubstitues,
            fqn,
            property.nullable
          )} ${property.name}() {`,
          NL
        );
        node.indent((body) => {
          body.append(`return this.${property.name};`, NL);
        });
        node.append("}", NL);
      }
    } else {
      node.append(
        `public ${toFirstUpper(property.name)} ${property.name}() {`,
        NL
      );
      node.indent((body) => {
        body.append(`return this.${property.name};`, NL);
      });
      node.append("}", NL);
    }
  }
}
