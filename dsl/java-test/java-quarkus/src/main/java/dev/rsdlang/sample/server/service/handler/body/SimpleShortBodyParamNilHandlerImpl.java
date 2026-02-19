package dev.rsdlang.sample.server.service.handler.body;

import java.util.Optional;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleShortBodyParamNilHandlerImpl
		implements BodyParameterTypesServiceImpl.SimpleShortBodyParamNilHandler {

	@Override
	public NilResult simpleShortBodyParamNil(BuilderFactory _factory, Optional<Short> bodyShort) {
		return bodyShort.isPresent() ? NilResult.DEFINED : NilResult.NULL;
	}

}
