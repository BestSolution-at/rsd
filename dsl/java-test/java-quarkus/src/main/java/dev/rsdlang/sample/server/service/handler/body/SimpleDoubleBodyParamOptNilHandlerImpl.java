package dev.rsdlang.sample.server.service.handler.body;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleDoubleBodyParamOptNilHandlerImpl
		implements BodyParameterTypesServiceImpl.SimpleDoubleBodyParamOptNilHandler {

	@Override
	public NilResult simpleDoubleBodyParamOptNil(BuilderFactory _factory, Double bodyDouble) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'simpleDoubleBodyParamOptNil'");
	}

}
