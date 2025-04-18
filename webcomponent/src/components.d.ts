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
    interface RsdViewer {
        "model": string | MRSDModel;
        "projectname": string;
    }
}
declare global {
    interface HTMLRsdViewerElement extends Components.RsdViewer, HTMLStencilElement {
    }
    var HTMLRsdViewerElement: {
        prototype: HTMLRsdViewerElement;
        new (): HTMLRsdViewerElement;
    };
    interface HTMLElementTagNameMap {
        "rsd-viewer": HTMLRsdViewerElement;
    }
}
declare namespace LocalJSX {
    interface RsdViewer {
        "model"?: string | MRSDModel;
        "projectname"?: string;
    }
    interface IntrinsicElements {
        "rsd-viewer": RsdViewer;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "rsd-viewer": LocalJSX.RsdViewer & JSXBase.HTMLAttributes<HTMLRsdViewerElement>;
        }
    }
}
