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
import {
	isPContainerProperty,
	isPContainsProperty,
	isPRefProperty,
	RSDPersistenceModel,
	RSDRestModel,
} from './generated/ast.js';

export class RemoteServiceRESTScopeComputation extends DefaultScopeComputation {
	override async collectLocalSymbols(
		document: LangiumDocument,
		cancelToken = Cancellation.CancellationToken.None,
	): Promise<LocalSymbols> {
		// const scopes = await super.computeLocalScopes(document, cancelToken);
		const symbols = new MultiMap<AstNode, AstNodeDescription>();
		const model = document.parseResult.value as RSDRestModel;
		for (const r of model.resources) {
			await interruptAndCheck(cancelToken);
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- upon resolve failure the ref can be undefined
			if (r.service?.ref) {
				const service = r.service.ref;
				const localDescriptions = service.operations.map(o => {
					return this.descriptions.createDescription(o, o.name, o.$document);
				});
				symbols.addAll(r, localDescriptions);
				for (const e of r.endpoints) {
					const o = service.operations.find(s => s.name === e.operation.$refText);
					if (o) {
						for (const p of e.specialParameters) {
							const localDescriptions = o.parameters.map(pp => {
								return this.descriptions.createDescription(pp, pp.namedType.name, pp.$document);
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
	override async collectLocalSymbols(
		document: LangiumDocument,
		cancelToken = Cancellation.CancellationToken.None,
	): Promise<LocalSymbols> {
		// const scopes = await super.computeLocalScopes(document, cancelToken);
		const model = document.parseResult.value as RSDPersistenceModel;
		const symbols = new MultiMap<AstNode, AstNodeDescription>();

		for (const e of model.entities) {
			await interruptAndCheck(cancelToken);
			for (const refs of e.properties.filter(isPRefProperty)) {
				// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- upon resolve failure the ref can be undefined
				if (refs.type?.ref) {
					const localDescriptions = refs.type.ref.properties.filter(isPRefProperty).map(p => {
						return this.descriptions.createDescription(p, p.name, p.$document);
					});
					symbols.addAll(refs, localDescriptions);
				}
			}
			for (const contains of e.properties.filter(isPContainsProperty)) {
				// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- upon resolve failure the ref can be undefined
				if (contains.type?.ref) {
					const localDescriptions = contains.type.ref.properties.filter(isPContainerProperty).map(p => {
						return this.descriptions.createDescription(p, p.name, p.$document);
					});
					symbols.addAll(contains, localDescriptions);
				}
			}
		}

		return symbols;
	}
}
