package dev.rsdlang.sample.server.service.handler.header;

import java.util.Optional;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.HeaderParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleFloatHeaderParamNilHandlerImpl
		implements HeaderParameterTypesServiceImpl.SimpleFloatHeaderParamNilHandler {

	@Override
	public NilResult simpleFloatHeaderParamNil(BuilderFactory _factory, Optional<Float> headerValue) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'simpleFloatHeaderParamNil'");
	}

}
