package dev.rsdlang.sample.server.service.handler.body;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import dev.rsdlang.sample.server.service.model._Base.Nillable;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleLongBodyParamOptNilHandlerImpl
		implements BodyParameterTypesServiceImpl.SimpleLongBodyParamOptNilHandler {

	@Override
	public NilResult simpleLongBodyParamOptNil(BuilderFactory _factory, Nillable<Long> bodyLong) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'simpleLongBodyParamOptNil'");
	}

}
