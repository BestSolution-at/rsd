package dev.rsdlang.sample.server.service.handler.body;

import java.time.ZoneId;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;

public class SimpleScalarBodyParamOptNilHandlerImpl
		implements BodyParameterTypesServiceImpl.SimpleScalarBodyParamOptNilHandler {

	@Override
	public NilResult simpleScalarBodyParamOptNil(BuilderFactory _factory, ZoneId bodyScalar) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'simpleScalarBodyParamOptNil'");
	}

}
