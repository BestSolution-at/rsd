package dev.rsdlang.sample.server.service.handler.body;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import dev.rsdlang.sample.server.service.model.SampleEnum;

public class SimpleEnumBodyParamNilHandlerImpl implements BodyParameterTypesServiceImpl.SimpleEnumBodyParamNilHandler {

	@Override
	public NilResult simpleEnumBodyParamNil(BuilderFactory _factory, SampleEnum bodyEnum) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'simpleEnumBodyParamNil'");
	}

}
