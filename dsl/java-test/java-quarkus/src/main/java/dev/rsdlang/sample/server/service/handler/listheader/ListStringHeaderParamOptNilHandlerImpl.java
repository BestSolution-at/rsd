package dev.rsdlang.sample.server.service.handler.listheader;

import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListHeaderParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListStringHeaderParamOptNilHandlerImpl
		implements ListHeaderParameterTypesServiceImpl.ListStringHeaderParamOptNilHandler {

	@Override
	public NilResult listStringHeaderParamOptNil(BuilderFactory _factory, List<String> headerValue) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'listStringHeaderParamOptNil'");
	}

}
