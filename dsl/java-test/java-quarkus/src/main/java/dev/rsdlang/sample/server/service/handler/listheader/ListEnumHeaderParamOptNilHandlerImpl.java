package dev.rsdlang.sample.server.service.handler.listheader;

import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListHeaderParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import dev.rsdlang.sample.server.service.model.SampleEnum;

public class ListEnumHeaderParamOptNilHandlerImpl
		implements ListHeaderParameterTypesServiceImpl.ListEnumHeaderParamOptNilHandler {

	@Override
	public NilResult listEnumHeaderParamOptNil(BuilderFactory _factory, List<SampleEnum> headerValue) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'listEnumHeaderParamOptNil'");
	}

}
