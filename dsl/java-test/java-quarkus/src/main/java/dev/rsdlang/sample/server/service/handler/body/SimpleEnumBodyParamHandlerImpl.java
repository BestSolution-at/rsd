package dev.rsdlang.sample.server.service.handler.body;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.SampleEnum;

public class SimpleEnumBodyParamHandlerImpl implements BodyParameterTypesServiceImpl.SimpleEnumBodyParamHandler {

	@Override
	public SampleEnum simpleEnumBodyParam(BuilderFactory _factory, SampleEnum bodyEnum) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'simpleEnumBodyParam'");
	}

}
