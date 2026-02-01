package dev.rsdlang.sample.server.service.handler.header;

import java.time.ZoneId;
import java.util.Optional;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.HeaderParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleScalarHeaderParamNilHandlerImpl
		implements HeaderParameterTypesServiceImpl.SimpleScalarHeaderParamNilHandler {

	@Override
	public NilResult simpleScalarHeaderParamNil(BuilderFactory _factory, Optional<ZoneId> headerValue) {
		return headerValue.isPresent() ? NilResult.DEFINED : NilResult.NULL;
	}

}
