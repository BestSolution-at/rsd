package dev.rsdlang.sample.server.service.handler.body;

import java.util.Optional;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleBooleanBodyParamNilHandlerImpl
		implements BodyParameterTypesServiceImpl.SimpleBooleanBodyParamNilHandler {

	@Override
	public NilResult simpleBooleanBodyParamNil(BuilderFactory _factory, Optional<Boolean> bodyBoolean) {
		return bodyBoolean.isPresent() ? NilResult.DEFINED : NilResult.NULL;
	}

}
