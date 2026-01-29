package dev.rsdlang.sample.server.service.handler.listquery;

import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListQueryParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.SampleEnum;

public class ListEnumQueryParamHandlerImpl
		implements ListQueryParameterTypesServiceImpl.ListEnumQueryParamHandler {

	@Override
	public List<SampleEnum> listEnumQueryParam(BuilderFactory _factory, List<SampleEnum> queryValue) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'listEnumQueryParam'");
	}

}
