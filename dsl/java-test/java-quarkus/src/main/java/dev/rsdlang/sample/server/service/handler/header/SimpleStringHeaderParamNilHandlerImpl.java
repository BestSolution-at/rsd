package dev.rsdlang.sample.server.service.handler.header;

import java.util.Optional;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.HeaderParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleStringHeaderParamNilHandlerImpl
		implements HeaderParameterTypesServiceImpl.SimpleStringHeaderParamNilHandler {

	@Override
	public NilResult simpleStringHeaderParamNil(BuilderFactory _factory, Optional<String> headerValue) {
		return headerValue.isPresent() ? NilResult.DEFINED : NilResult.NULL;
	}

}
