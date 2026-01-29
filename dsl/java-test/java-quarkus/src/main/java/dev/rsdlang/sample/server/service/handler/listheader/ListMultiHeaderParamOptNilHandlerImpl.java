package dev.rsdlang.sample.server.service.handler.listheader;

import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListHeaderParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import dev.rsdlang.sample.server.service.model.SimpleRecord.Data;

public class ListMultiHeaderParamOptNilHandlerImpl
		implements ListHeaderParameterTypesServiceImpl.ListMultiHeaderParamOptNilHandler {

	@Override
	public List<NilResult> listMultiHeaderParamOptNil(BuilderFactory _factory, List<String> valueA, List<Integer> valueB,
			List<Data> valueC) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'listMultiHeaderParamOptNil'");
	}

}
