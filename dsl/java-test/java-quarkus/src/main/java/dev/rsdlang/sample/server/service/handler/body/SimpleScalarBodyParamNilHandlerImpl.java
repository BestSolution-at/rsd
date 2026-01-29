package dev.rsdlang.sample.server.service.handler.body;

import java.time.ZoneId;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;

public class SimpleScalarBodyParamNilHandlerImpl
		implements BodyParameterTypesServiceImpl.SimpleScalarBodyParamNilHandler {

	@Override
	public NilResult simpleScalarBodyParamNil(BuilderFactory _factory, ZoneId bodyScalar) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'simpleScalarBodyParamNil'");
	}

}
