package dev.rsdlang.sample.server.service.handler.header;

import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.HeaderParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;

public class MultiHeaderParamNilHandlerImpl implements HeaderParameterTypesServiceImpl.MultiHeaderParamNilHandler {

	@Override
	public List<NilResult> multiHeaderParamNil(BuilderFactory _factory, String valueA, Integer valueB) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'multiHeaderParamNil'");
	}

}
