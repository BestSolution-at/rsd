package dev.rsdlang.sample.server.service.handler.header;

import java.util.OptionalDouble;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.HeaderParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleDoubleHeaderParamNilHandlerImpl
		implements HeaderParameterTypesServiceImpl.SimpleDoubleHeaderParamNilHandler {

	@Override
	public NilResult simpleDoubleHeaderParamNil(BuilderFactory _factory, OptionalDouble headerValue) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'simpleDoubleHeaderParamNil'");
	}

}
