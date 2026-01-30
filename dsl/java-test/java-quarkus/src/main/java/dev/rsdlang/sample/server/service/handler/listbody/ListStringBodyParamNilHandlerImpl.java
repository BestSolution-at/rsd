package dev.rsdlang.sample.server.service.handler.listbody;

import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListBodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListStringBodyParamNilHandlerImpl
		implements ListBodyParameterTypesServiceImpl.ListStringBodyParamNilHandler {

	@Override
	public NilResult listStringBodyParamNil(BuilderFactory _factory, List<String> bodyString) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'listStringBodyParamNil'");
	}

}
