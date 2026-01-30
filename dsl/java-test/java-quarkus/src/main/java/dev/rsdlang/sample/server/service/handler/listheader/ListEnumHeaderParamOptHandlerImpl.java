package dev.rsdlang.sample.server.service.handler.listheader;

import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListHeaderParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import dev.rsdlang.sample.server.service.model.SampleEnum;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListEnumHeaderParamOptHandlerImpl
		implements ListHeaderParameterTypesServiceImpl.ListEnumHeaderParamOptHandler {

	@Override
	public NilResult listEnumHeaderParamOpt(BuilderFactory _factory, List<SampleEnum> headerValue) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'listEnumHeaderParamOpt'");
	}

}
