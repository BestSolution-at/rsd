package dev.rsdlang.sample.server.service.handler.header;

import java.time.ZonedDateTime;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.HeaderParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;

public class SimpleZonedDateTimeHeaderParamNilHandlerImpl
		implements HeaderParameterTypesServiceImpl.SimpleZonedDateTimeHeaderParamNilHandler {

	@Override
	public NilResult simpleZonedDateTimeHeaderParamNil(BuilderFactory _factory, ZonedDateTime headerValue) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'simpleZonedDateTimeHeaderParamNil'");
	}

}
