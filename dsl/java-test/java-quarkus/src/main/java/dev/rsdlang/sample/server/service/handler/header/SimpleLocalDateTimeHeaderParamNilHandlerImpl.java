package dev.rsdlang.sample.server.service.handler.header;

import java.time.LocalDateTime;
import java.util.Optional;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.HeaderParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleLocalDateTimeHeaderParamNilHandlerImpl
		implements HeaderParameterTypesServiceImpl.SimpleLocalDateTimeHeaderParamNilHandler {

	@Override
	public NilResult simpleLocalDateTimeHeaderParamNil(BuilderFactory _factory, Optional<LocalDateTime> headerValue) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'simpleLocalDateTimeHeaderParamNil'");
	}

}
