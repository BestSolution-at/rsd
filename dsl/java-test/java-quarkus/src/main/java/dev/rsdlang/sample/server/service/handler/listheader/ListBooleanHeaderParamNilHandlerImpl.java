package dev.rsdlang.sample.server.service.handler.listheader;

import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListHeaderParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;

public class ListBooleanHeaderParamNilHandlerImpl
		implements ListHeaderParameterTypesServiceImpl.ListBooleanHeaderParamNilHandler {

	@Override
	public NilResult listBooleanHeaderParamNil(BuilderFactory _factory, List<Boolean> headerValue) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'listBooleanHeaderParamNil'");
	}

}
