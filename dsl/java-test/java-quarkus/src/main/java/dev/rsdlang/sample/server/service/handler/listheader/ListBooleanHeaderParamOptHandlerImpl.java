package dev.rsdlang.sample.server.service.handler.listheader;

import java.util.List;
import java.util.Optional;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListHeaderParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListBooleanHeaderParamOptHandlerImpl
		implements ListHeaderParameterTypesServiceImpl.ListBooleanHeaderParamOptHandler {

	@Override
	public NilResult listBooleanHeaderParamOpt(BuilderFactory _factory, Optional<List<Boolean>> headerValue) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'listBooleanHeaderParamOpt'");
	}

}
