import { AstNode, Cancellation, DefaultScopeComputation, LangiumDocument, PrecomputedScopes, interruptAndCheck } from "langium";
import { RemoteServiceDescriptionServices } from "./remote-service-description-module.js";
import { RSDRestModel } from "./generated/ast.js";

export class RemoteServiceRESTScopeComputation extends DefaultScopeComputation {
    constructor(services: RemoteServiceDescriptionServices) {
        super(services);
    }

    override async computeLocalScopes(document: LangiumDocument<AstNode>, cancelToken = Cancellation.CancellationToken.None): Promise<PrecomputedScopes> {
        const scopes = await super.computeLocalScopes(document, cancelToken);
        const model = document.parseResult.value as RSDRestModel;
        for( const r of model.resources ) {
            await interruptAndCheck(cancelToken);
            if( r.service && r.service.ref ) {
                const service = r.service.ref;
                const localDescriptions = service.operations.map( o => {
                    return this.descriptions.createDescription(o, o.name, o.$document);
                })
                scopes.addAll(r, localDescriptions)
                for( const e of r.endpoints ) {
                    const o = service.operations.find( s => e.operation && s.name === e.operation.$refText )
                    if( o ) {
                        for( const p of e.specialParameters ) {
                            const localDescriptions = o.parameters.map( pp => {
                                return this.descriptions.createDescription(pp, pp.namedType.name, pp.$document)
                            })
                            scopes.addAll(p, localDescriptions)
                        }
                    }
                }
            }
            /*for( const e of r.endpoints ) {
                await interruptAndCheck(cancelToken);
                for( const p of e.specialParameters ) {
                    await interruptAndCheck(cancelToken);
                    if( e.operation.ref ) {
                        const localDescriptions = e.operation.ref.parameters.map( pp => {
                            return this.descriptions.createDescription(pp, pp.namedType.name, pp.$document)
                        })
                        scopes.addAll(p, localDescriptions)
                    }
                }
            }*/
        }
        return scopes;
    }
}