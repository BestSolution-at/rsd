package dev.rsdlang.sample.server.service.handler.body;

import java.time.ZoneId;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BodyParameterTypesServiceImpl;

public class SimpleScalarBodyParamHandlerImpl implements BodyParameterTypesServiceImpl.SimpleScalarBodyParamHandler {

	@Override
	public ZoneId simpleScalarBodyParam(BuilderFactory _factory, ZoneId bodyScalar) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'simpleScalarBodyParam'");
	}

}
