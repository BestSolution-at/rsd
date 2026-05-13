package dev.rsdlang.sample.server.service.handler.body;

import java.time.LocalTime;
import java.util.Optional;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleLocalTimeBodyParamNilHandlerImpl
		implements BodyParameterTypesServiceImpl.SimpleLocalTimeBodyParamNilHandler {

	@Override
	public NilResult simpleLocalTimeBodyParamNil(BuilderFactory _factory, Optional<LocalTime> bodyLocalTime) {
		return bodyLocalTime.isPresent() ? NilResult.DEFINED : NilResult.NULL;
	}

}
