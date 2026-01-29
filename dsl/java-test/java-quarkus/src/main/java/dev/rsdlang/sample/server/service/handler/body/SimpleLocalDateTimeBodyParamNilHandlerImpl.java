package dev.rsdlang.sample.server.service.handler.body;

import java.time.LocalDateTime;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;

public class SimpleLocalDateTimeBodyParamNilHandlerImpl
		implements BodyParameterTypesServiceImpl.SimpleLocalDateTimeBodyParamNilHandler {

	@Override
	public NilResult simpleLocalDateTimeBodyParamNil(BuilderFactory _factory, LocalDateTime bodyLocalDateTime) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'simpleLocalDateTimeBodyParamNil'");
	}

}
