package dev.rsdlang.sample.server.service.handler.header;

import java.time.LocalTime;
import java.util.Optional;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.HeaderParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleLocalTimeHeaderParamOptHandlerImpl
		implements HeaderParameterTypesServiceImpl.SimpleLocalTimeHeaderParamOptHandler {

	@Override
	public NilResult simpleLocalTimeHeaderParamOpt(BuilderFactory _factory, Optional<LocalTime> headerValue) {
		return headerValue.isPresent() ? NilResult.DEFINED : NilResult.UNDEFINED;
	}

}
