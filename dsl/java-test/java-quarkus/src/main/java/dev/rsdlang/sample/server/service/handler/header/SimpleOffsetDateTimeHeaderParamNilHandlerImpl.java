package dev.rsdlang.sample.server.service.handler.header;

import java.time.OffsetDateTime;
import java.util.Optional;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.HeaderParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleOffsetDateTimeHeaderParamNilHandlerImpl
		implements HeaderParameterTypesServiceImpl.SimpleOffsetDateTimeHeaderParamNilHandler {

	@Override
	public NilResult simpleOffsetDateTimeHeaderParamNil(BuilderFactory _factory, Optional<OffsetDateTime> headerValue) {
		return headerValue.isPresent() ? NilResult.DEFINED : NilResult.NULL;
	}

}