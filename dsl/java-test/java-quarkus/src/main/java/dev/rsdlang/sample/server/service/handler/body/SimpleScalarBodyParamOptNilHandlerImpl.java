package dev.rsdlang.sample.server.service.handler.body;

import java.time.ZoneId;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import dev.rsdlang.sample.server.service.model._Base.Nillable;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleScalarBodyParamOptNilHandlerImpl
		implements BodyParameterTypesServiceImpl.SimpleScalarBodyParamOptNilHandler {

	@Override
	public NilResult simpleScalarBodyParamOptNil(BuilderFactory _factory, Nillable<ZoneId> bodyScalar) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'simpleScalarBodyParamOptNil'");
	}

}
