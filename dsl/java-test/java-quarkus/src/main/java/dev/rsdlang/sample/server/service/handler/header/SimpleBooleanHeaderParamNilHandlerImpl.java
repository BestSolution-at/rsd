package dev.rsdlang.sample.server.service.handler.header;

import java.util.Optional;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.HeaderParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleBooleanHeaderParamNilHandlerImpl
		implements HeaderParameterTypesServiceImpl.SimpleBooleanHeaderParamNilHandler {

	@Override
	public NilResult simpleBooleanHeaderParamNil(BuilderFactory _factory, Optional<Boolean> headerValue) {
		return headerValue.isPresent() ? NilResult.DEFINED : NilResult.NULL;
	}

}
