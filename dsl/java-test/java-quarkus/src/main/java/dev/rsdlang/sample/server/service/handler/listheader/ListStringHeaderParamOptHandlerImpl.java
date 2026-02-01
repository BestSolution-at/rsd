package dev.rsdlang.sample.server.service.handler.listheader;

import java.util.List;
import java.util.Optional;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListHeaderParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListStringHeaderParamOptHandlerImpl
		implements ListHeaderParameterTypesServiceImpl.ListStringHeaderParamOptHandler {

	@Override
	public NilResult listStringHeaderParamOpt(BuilderFactory _factory, Optional<List<String>> headerValue) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'listStringHeaderParamOpt'");
	}

}
