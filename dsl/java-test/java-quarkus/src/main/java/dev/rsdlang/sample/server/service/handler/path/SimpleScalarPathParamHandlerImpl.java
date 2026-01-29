package dev.rsdlang.sample.server.service.handler.path;

import java.time.ZoneId;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.PathParameterTypeServiceServiceImpl;

public class SimpleScalarPathParamHandlerImpl
		implements PathParameterTypeServiceServiceImpl.SimpleScalarPathParamHandler {

	@Override
	public ZoneId simpleScalarPathParam(BuilderFactory _factory, ZoneId pathScalar) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'simpleScalarPathParam'");
	}

}
