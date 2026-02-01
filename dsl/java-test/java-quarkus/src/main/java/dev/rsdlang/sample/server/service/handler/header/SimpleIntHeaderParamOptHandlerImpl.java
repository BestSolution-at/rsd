package dev.rsdlang.sample.server.service.handler.header;

import java.util.OptionalInt;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.HeaderParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleIntHeaderParamOptHandlerImpl
		implements HeaderParameterTypesServiceImpl.SimpleIntHeaderParamOptHandler {

	@Override
	public NilResult simpleIntHeaderParamOpt(BuilderFactory _factory, OptionalInt headerValue) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'simpleIntHeaderParamOpt'");
	}

}
