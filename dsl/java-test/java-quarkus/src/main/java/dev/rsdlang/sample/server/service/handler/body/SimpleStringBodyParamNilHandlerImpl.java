package dev.rsdlang.sample.server.service.handler.body;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;

public class SimpleStringBodyParamNilHandlerImpl
		implements BodyParameterTypesServiceImpl.SimpleStringBodyParamNilHandler {

	@Override
	public NilResult simpleStringBodyParamNil(BuilderFactory _factory, String bodyString) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'simpleStringBodyParamNil'");
	}

}
