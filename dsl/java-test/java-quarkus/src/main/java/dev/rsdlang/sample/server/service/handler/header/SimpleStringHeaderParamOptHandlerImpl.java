package dev.rsdlang.sample.server.service.handler.header;

import java.util.Optional;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.HeaderParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleStringHeaderParamOptHandlerImpl
		implements HeaderParameterTypesServiceImpl.SimpleStringHeaderParamOptHandler {

	@Override
	public NilResult simpleStringHeaderParamOpt(BuilderFactory _factory, Optional<String> headerValue) {
		return headerValue.isPresent() ? NilResult.DEFINED : NilResult.UNDEFINED;
	}

}
