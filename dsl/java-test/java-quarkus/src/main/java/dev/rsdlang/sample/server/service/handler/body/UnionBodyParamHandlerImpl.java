package dev.rsdlang.sample.server.service.handler.body;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.Union.Data;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class UnionBodyParamHandlerImpl implements BodyParameterTypesServiceImpl.UnionBodyParamHandler {

	@Override
	public Data unionBodyParam(BuilderFactory _factory, Data bodyUnion) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'unionBodyParam'");
	}

}
