package dev.rsdlang.sample.server.service.handler.path;

import java.time.LocalDateTime;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.PathParameterTypeServiceServiceImpl;

public class SimpleLocalDateTimePathParamHandlerImpl
		implements PathParameterTypeServiceServiceImpl.SimpleLocalDateTimePathParamHandler {

	@Override
	public LocalDateTime simpleLocalDateTimePathParam(BuilderFactory _factory, LocalDateTime pathLocalDateTime) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'simpleLocalDateTimePathParam'");
	}

}
