package dev.rsdlang.sample.server.service.handler.body;

import java.util.Optional;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.model.NilResult;
import dev.rsdlang.sample.server.model.ZoneId;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleScalarBodyParamNilHandlerImpl
		implements BodyParameterTypesServiceImpl.SimpleScalarBodyParamNilHandler {

	@Override
	public NilResult simpleScalarBodyParamNil(BuilderFactory _factory, Optional<ZoneId> bodyScalar) {
		return bodyScalar.isPresent() ? NilResult.DEFINED : NilResult.NULL;
	}

}
