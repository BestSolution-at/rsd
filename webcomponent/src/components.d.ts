/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { MRSDModel } from "./utils/model";
export { MRSDModel } from "./utils/model";
export namespace Components {
    interface RsdPreview {
        "model": string | MRSDModel;
        "projectname": string;
    }
    interface RsdPreviewAlt {
        "model": string | MRSDModel;
        "projectname": string;
    }
}
declare global {
    interface HTMLRsdPreviewElement extends Components.RsdPreview, HTMLStencilElement {
    }
    var HTMLRsdPreviewElement: {
        prototype: HTMLRsdPreviewElement;
        new (): HTMLRsdPreviewElement;
    };
    interface HTMLRsdPreviewAltElement extends Components.RsdPreviewAlt, HTMLStencilElement {
    }
    var HTMLRsdPreviewAltElement: {
        prototype: HTMLRsdPreviewAltElement;
        new (): HTMLRsdPreviewAltElement;
    };
    interface HTMLElementTagNameMap {
        "rsd-preview": HTMLRsdPreviewElement;
        "rsd-preview-alt": HTMLRsdPreviewAltElement;
    }
}
declare namespace LocalJSX {
    interface RsdPreview {
        "model"?: string | MRSDModel;
        "projectname"?: string;
    }
    interface RsdPreviewAlt {
        "model"?: string | MRSDModel;
        "projectname"?: string;
    }
    interface IntrinsicElements {
        "rsd-preview": RsdPreview;
        "rsd-preview-alt": RsdPreviewAlt;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "rsd-preview": LocalJSX.RsdPreview & JSXBase.HTMLAttributes<HTMLRsdPreviewElement>;
            "rsd-preview-alt": LocalJSX.RsdPreviewAlt & JSXBase.HTMLAttributes<HTMLRsdPreviewAltElement>;
        }
    }
}
