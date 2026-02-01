package dev.rsdlang.sample.server.service.handler.body;

import java.time.ZoneId;
import java.util.Optional;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleScalarBodyParamOptHandlerImpl
		implements BodyParameterTypesServiceImpl.SimpleScalarBodyParamOptHandler {

	@Override
	public NilResult simpleScalarBodyParamOpt(BuilderFactory _factory, Optional<ZoneId> bodyScalar) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'simpleScalarBodyParamOpt'");
	}

}
