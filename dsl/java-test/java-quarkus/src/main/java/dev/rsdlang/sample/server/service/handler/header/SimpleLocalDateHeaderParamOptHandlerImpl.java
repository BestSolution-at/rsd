package dev.rsdlang.sample.server.service.handler.header;

import java.time.LocalDate;
import java.util.Optional;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.HeaderParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleLocalDateHeaderParamOptHandlerImpl
		implements HeaderParameterTypesServiceImpl.SimpleLocalDateHeaderParamOptHandler {

	@Override
	public NilResult simpleLocalDateHeaderParamOpt(BuilderFactory _factory, Optional<LocalDate> headerValue) {
		return headerValue.isPresent() ? NilResult.DEFINED : NilResult.UNDEFINED;
	}

}
