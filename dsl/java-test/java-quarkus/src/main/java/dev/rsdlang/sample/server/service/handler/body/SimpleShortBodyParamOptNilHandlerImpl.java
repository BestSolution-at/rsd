package dev.rsdlang.sample.server.service.handler.body;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import dev.rsdlang.sample.server.service.model._Base.Nillable;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleShortBodyParamOptNilHandlerImpl
		implements BodyParameterTypesServiceImpl.SimpleShortBodyParamOptNilHandler {

	@Override
	public NilResult simpleShortBodyParamOptNil(BuilderFactory _factory, Nillable<Short> bodyShort) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'simpleShortBodyParamOptNil'");
	}

}
