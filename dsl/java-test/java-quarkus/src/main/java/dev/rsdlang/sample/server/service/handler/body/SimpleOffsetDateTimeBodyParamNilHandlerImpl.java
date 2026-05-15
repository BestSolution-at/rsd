package dev.rsdlang.sample.server.service.handler.body;

import java.time.OffsetDateTime;
import java.util.Optional;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleOffsetDateTimeBodyParamNilHandlerImpl
		implements BodyParameterTypesServiceImpl.SimpleOffsetDateTimeBodyParamNilHandler {

	@Override
	public NilResult simpleOffsetDateTimeBodyParamNil(BuilderFactory _factory, Optional<OffsetDateTime> bodyOffsetDateTime) {
		return bodyOffsetDateTime.isPresent() ? NilResult.DEFINED : NilResult.NULL;
	}

}