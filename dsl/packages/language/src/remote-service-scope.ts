import {
  AstNode,
  AstNodeDescription,
  Cancellation,
  DefaultScopeComputation,
  LangiumDocument,
  LocalSymbols,
  MultiMap,
  interruptAndCheck,
} from 'langium';
import { RemoteServiceDescriptionServices } from './remote-service-description-module.js';
import {
  isPManyToOneProperty,
  isPOneToManyProperty,
  RSDPersistenceModel,
  RSDRestModel,
} from './generated/ast.js';

export class RemoteServiceRESTScopeComputation extends DefaultScopeComputation {
  constructor(services: RemoteServiceDescriptionServices) {
    super(services);
  }

  override async collectLocalSymbols(
    document: LangiumDocument<AstNode>,
    cancelToken = Cancellation.CancellationToken.None
  ): Promise<LocalSymbols> {
    // const scopes = await super.computeLocalScopes(document, cancelToken);
    const symbols = new MultiMap<AstNode, AstNodeDescription>();
    const model = document.parseResult.value as RSDRestModel;
    for (const r of model.resources) {
      await interruptAndCheck(cancelToken);
      if (r.service && r.service.ref) {
        const service = r.service.ref;
        const localDescriptions = service.operations.map((o) => {
          return this.descriptions.createDescription(o, o.name, o.$document);
        });
        symbols.addAll(r, localDescriptions);
        for (const e of r.endpoints) {
          const o = service.operations.find(
            (s) => e.operation && s.name === e.operation.$refText
          );
          if (o) {
            for (const p of e.specialParameters) {
              const localDescriptions = o.parameters.map((pp) => {
                return this.descriptions.createDescription(
                  pp,
                  pp.namedType.name,
                  pp.$document
                );
              });
              symbols.addAll(p, localDescriptions);
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
    return symbols;
  }
}

export class RemoteServicePersistenceScopeComputation extends DefaultScopeComputation {
  constructor(services: RemoteServiceDescriptionServices) {
    super(services);
  }

  override async collectLocalSymbols(
    document: LangiumDocument<AstNode>,
    cancelToken = Cancellation.CancellationToken.None
  ): Promise<LocalSymbols> {
    // const scopes = await super.computeLocalScopes(document, cancelToken);
    const model = document.parseResult.value as RSDPersistenceModel;
    const symbols = new MultiMap<AstNode, AstNodeDescription>();

    for (const e of model.entities) {
      for (const oneToMany of e.properties.filter(isPOneToManyProperty)) {
        if (oneToMany.type && oneToMany.type.ref) {
          const localDescriptions = oneToMany.type.ref.properties
            .filter(isPManyToOneProperty)
            .map((p) => {
              return this.descriptions.createDescription(
                p,
                p.name,
                p.$document
              );
            });
          symbols.addAll(oneToMany, localDescriptions);
        }
      }
    }

    return symbols;
  }
}
