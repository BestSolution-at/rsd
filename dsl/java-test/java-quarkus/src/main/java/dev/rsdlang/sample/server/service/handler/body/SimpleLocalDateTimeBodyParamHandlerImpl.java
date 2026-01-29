package dev.rsdlang.sample.server.service.handler.body;

import java.time.LocalDateTime;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BodyParameterTypesServiceImpl;

public class SimpleLocalDateTimeBodyParamHandlerImpl
		implements BodyParameterTypesServiceImpl.SimpleLocalDateTimeBodyParamHandler {

	@Override
	public LocalDateTime simpleLocalDateTimeBodyParam(BuilderFactory _factory, LocalDateTime bodyLocalDateTime) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'simpleLocalDateTimeBodyParam'");
	}

}
