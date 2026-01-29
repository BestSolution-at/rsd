package dev.rsdlang.sample.server.service.handler.body;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import dev.rsdlang.sample.server.service.model.Union.Data;

public class UnionBodyParamNilHandlerImpl implements BodyParameterTypesServiceImpl.UnionBodyParamNilHandler {

	@Override
	public NilResult unionBodyParamNil(BuilderFactory _factory, Data bodyUnion) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'unionBodyParamNil'");
	}

}
