package dev.rsdlang.sample.server.service.handler.header;

import java.time.ZonedDateTime;
import java.util.Optional;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.HeaderParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleZonedDateTimeHeaderParamOptHandlerImpl
		implements HeaderParameterTypesServiceImpl.SimpleZonedDateTimeHeaderParamOptHandler {

	@Override
	public NilResult simpleZonedDateTimeHeaderParamOpt(BuilderFactory _factory, Optional<ZonedDateTime> headerValue) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'simpleZonedDateTimeHeaderParamOpt'");
	}

}
