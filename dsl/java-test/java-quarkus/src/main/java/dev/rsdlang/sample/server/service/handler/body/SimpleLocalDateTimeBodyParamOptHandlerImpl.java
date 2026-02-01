package dev.rsdlang.sample.server.service.handler.body;

import java.time.LocalDateTime;
import java.util.Optional;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleLocalDateTimeBodyParamOptHandlerImpl
		implements BodyParameterTypesServiceImpl.SimpleLocalDateTimeBodyParamOptHandler {

	@Override
	public NilResult simpleLocalDateTimeBodyParamOpt(BuilderFactory _factory, Optional<LocalDateTime> bodyLocalDateTime) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'simpleLocalDateTimeBodyParamOpt'");
	}

}
