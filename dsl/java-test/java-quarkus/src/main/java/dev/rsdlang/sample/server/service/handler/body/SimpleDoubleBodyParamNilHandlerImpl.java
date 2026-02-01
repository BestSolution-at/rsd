package dev.rsdlang.sample.server.service.handler.body;

import java.util.OptionalDouble;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleDoubleBodyParamNilHandlerImpl
		implements BodyParameterTypesServiceImpl.SimpleDoubleBodyParamNilHandler {

	@Override
	public NilResult simpleDoubleBodyParamNil(BuilderFactory _factory, OptionalDouble bodyDouble) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'simpleDoubleBodyParamNil'");
	}

}
