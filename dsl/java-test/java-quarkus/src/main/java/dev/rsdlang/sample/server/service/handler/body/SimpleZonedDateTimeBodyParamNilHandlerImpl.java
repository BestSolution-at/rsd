package dev.rsdlang.sample.server.service.handler.body;

import java.time.ZonedDateTime;
import java.util.Optional;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleZonedDateTimeBodyParamNilHandlerImpl
		implements BodyParameterTypesServiceImpl.SimpleZonedDateTimeBodyParamNilHandler {

	@Override
	public NilResult simpleZonedDateTimeBodyParamNil(BuilderFactory _factory, Optional<ZonedDateTime> bodyZonedDateTime) {
		return bodyZonedDateTime.isPresent() ? NilResult.DEFINED : NilResult.NULL;
	}

}
