package dev.rsdlang.sample.server.service.handler.body;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.Union;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class UnionBodyParamHandlerImpl implements BodyParameterTypesServiceImpl.UnionBodyParamHandler {

	@Override
	public Union.Data unionBodyParam(BuilderFactory _factory, Union.Data bodyUnion) {
		return bodyUnion;
	}

}
