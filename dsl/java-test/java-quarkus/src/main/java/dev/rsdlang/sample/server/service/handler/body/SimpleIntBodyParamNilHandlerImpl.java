package dev.rsdlang.sample.server.service.handler.body;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;

public class SimpleIntBodyParamNilHandlerImpl implements BodyParameterTypesServiceImpl.SimpleIntBodyParamNilHandler {

	@Override
	public NilResult simpleIntBodyParamNil(BuilderFactory _factory, Integer bodyInt) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'simpleIntBodyParamNil'");
	}

}
