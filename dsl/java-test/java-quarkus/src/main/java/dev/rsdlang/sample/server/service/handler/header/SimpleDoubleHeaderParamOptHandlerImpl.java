package dev.rsdlang.sample.server.service.handler.header;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.HeaderParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleDoubleHeaderParamOptHandlerImpl
		implements HeaderParameterTypesServiceImpl.SimpleDoubleHeaderParamOptHandler {

	@Override
	public NilResult simpleDoubleHeaderParamOpt(BuilderFactory _factory, Double headerValue) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'simpleDoubleHeaderParamOpt'");
	}

}
