package dev.rsdlang.sample.server.service.handler.body;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import dev.rsdlang.sample.server.service.model.SampleEnum;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleEnumBodyParamOptNilHandlerImpl
		implements BodyParameterTypesServiceImpl.SimpleEnumBodyParamOptNilHandler {

	@Override
	public NilResult simpleEnumBodyParamOptNil(BuilderFactory _factory, SampleEnum bodyEnum) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'simpleEnumBodyParamOptNil'");
	}

}
