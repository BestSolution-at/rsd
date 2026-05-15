package dev.rsdlang.sample.server.service.handler.header;

import java.time.OffsetDateTime;
import java.util.Optional;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.HeaderParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleOffsetDateTimeHeaderParamOptHandlerImpl
		implements HeaderParameterTypesServiceImpl.SimpleOffsetDateTimeHeaderParamOptHandler {

	@Override
	public NilResult simpleOffsetDateTimeHeaderParamOpt(BuilderFactory _factory, Optional<OffsetDateTime> headerValue) {
		return headerValue.isPresent() ? NilResult.DEFINED : NilResult.UNDEFINED;
	}

}