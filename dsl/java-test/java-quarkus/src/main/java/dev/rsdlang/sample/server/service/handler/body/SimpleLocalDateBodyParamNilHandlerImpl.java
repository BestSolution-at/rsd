package dev.rsdlang.sample.server.service.handler.body;

import java.time.LocalDate;
import java.util.Optional;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleLocalDateBodyParamNilHandlerImpl
		implements BodyParameterTypesServiceImpl.SimpleLocalDateBodyParamNilHandler {

	@Override
	public NilResult simpleLocalDateBodyParamNil(BuilderFactory _factory, Optional<LocalDate> bodyLocalDate) {
		return bodyLocalDate.isPresent() ? NilResult.DEFINED : NilResult.NULL;
	}

}
