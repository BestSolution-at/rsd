package dev.rsdlang.sample.server.service.handler.listbody;

import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListBodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import dev.rsdlang.sample.server.service.model.SampleEnum;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListEnumBodyParamOptHandlerImpl implements ListBodyParameterTypesServiceImpl.ListEnumBodyParamOptHandler {

	@Override
	public NilResult listEnumBodyParamOpt(BuilderFactory _factory, List<SampleEnum> bodyEnum) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'listEnumBodyParamOpt'");
	}

}
