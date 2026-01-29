package dev.rsdlang.sample.server.service.handler.listheader;

import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListHeaderParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import dev.rsdlang.sample.server.service.model.SimpleRecord.Data;

public class ListRecordHeaderParamNilHandlerImpl
		implements ListHeaderParameterTypesServiceImpl.ListRecordHeaderParamNilHandler {

	@Override
	public NilResult listRecordHeaderParamNil(BuilderFactory _factory, List<Data> headerValue) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'listRecordHeaderParamNil'");
	}

}
