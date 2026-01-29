package dev.rsdlang.sample.server.service.handler.body;

import java.time.ZonedDateTime;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;

public class SimpleZonedDateTimeBodyParamOptHandlerImpl
		implements BodyParameterTypesServiceImpl.SimpleZonedDateTimeBodyParamOptHandler {

	@Override
	public NilResult simpleZonedDateTimeBodyParamOpt(BuilderFactory _factory, ZonedDateTime bodyZonedDateTime) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'simpleZonedDateTimeBodyParamOpt'");
	}

}
