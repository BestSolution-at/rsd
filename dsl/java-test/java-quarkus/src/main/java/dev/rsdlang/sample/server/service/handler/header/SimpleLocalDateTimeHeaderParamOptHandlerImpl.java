package dev.rsdlang.sample.server.service.handler.header;

import java.time.LocalDateTime;
import java.util.Optional;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.HeaderParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleLocalDateTimeHeaderParamOptHandlerImpl
		implements HeaderParameterTypesServiceImpl.SimpleLocalDateTimeHeaderParamOptHandler {

	@Override
	public NilResult simpleLocalDateTimeHeaderParamOpt(BuilderFactory _factory, Optional<LocalDateTime> headerValue) {
		return headerValue.isPresent() ? NilResult.DEFINED : NilResult.UNDEFINED;
	}

}
