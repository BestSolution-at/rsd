package dev.rsdlang.sample.server.service.handler.listbody;

import java.util.List;
import java.util.Optional;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListBodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListStringBodyParamOptHandlerImpl
		implements ListBodyParameterTypesServiceImpl.ListStringBodyParamOptHandler {

	@Override
	public NilResult listStringBodyParamOpt(BuilderFactory _factory, Optional<List<String>> bodyString) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'listStringBodyParamOpt'");
	}

}
