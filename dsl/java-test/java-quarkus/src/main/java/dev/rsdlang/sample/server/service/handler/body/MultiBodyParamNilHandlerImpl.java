package dev.rsdlang.sample.server.service.handler.body;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.SimpleRecord.Data;

public class MultiBodyParamNilHandlerImpl implements BodyParameterTypesServiceImpl.MultiBodyParamNilHandler {

	@Override
	public String multiBodyParamNil(BuilderFactory _factory, String valueA, Integer valueB, Data valueC) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'multiBodyParamNil'");
	}

}
