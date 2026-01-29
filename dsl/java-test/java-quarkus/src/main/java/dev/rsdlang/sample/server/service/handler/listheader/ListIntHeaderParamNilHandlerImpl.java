package dev.rsdlang.sample.server.service.handler.listheader;

import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListHeaderParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;

public class ListIntHeaderParamNilHandlerImpl
		implements ListHeaderParameterTypesServiceImpl.ListIntHeaderParamNilHandler {

	@Override
	public NilResult listIntHeaderParamNil(BuilderFactory _factory, List<Integer> headerValue) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'listIntHeaderParamNil'");
	}

}
