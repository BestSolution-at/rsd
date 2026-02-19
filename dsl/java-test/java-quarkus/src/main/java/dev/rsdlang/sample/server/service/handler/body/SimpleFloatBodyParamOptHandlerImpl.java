package dev.rsdlang.sample.server.service.handler.body;

import java.util.Optional;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleFloatBodyParamOptHandlerImpl
		implements BodyParameterTypesServiceImpl.SimpleFloatBodyParamOptHandler {

	@Override
	public NilResult simpleFloatBodyParamOpt(BuilderFactory _factory, Optional<Float> bodyFloat) {
		return bodyFloat.isPresent() ? NilResult.DEFINED : NilResult.UNDEFINED;
	}

}
