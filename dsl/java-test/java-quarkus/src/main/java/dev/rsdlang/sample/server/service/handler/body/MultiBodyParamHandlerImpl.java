package dev.rsdlang.sample.server.service.handler.body;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.SimpleRecord.Data;

public class MultiBodyParamHandlerImpl implements BodyParameterTypesServiceImpl.MultiBodyParamHandler {

	@Override
	public String multiBodyParam(BuilderFactory _factory, String valueA, int valueB, Data valueC) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'multiBodyParam'");
	}

}
