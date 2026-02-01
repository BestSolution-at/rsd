package dev.rsdlang.sample.server.service.handler.body;

import java.util.OptionalInt;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleIntBodyParamOptHandlerImpl implements BodyParameterTypesServiceImpl.SimpleIntBodyParamOptHandler {

	@Override
	public NilResult simpleIntBodyParamOpt(BuilderFactory _factory, OptionalInt bodyInt) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'simpleIntBodyParamOpt'");
	}

}
