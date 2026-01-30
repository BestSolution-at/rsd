package dev.rsdlang.sample.server.service.handler.listbody;

import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListBodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListIntBodyParamOptNilHandlerImpl
		implements ListBodyParameterTypesServiceImpl.ListIntBodyParamOptNilHandler {

	@Override
	public NilResult listIntBodyParamOptNil(BuilderFactory _factory, List<Integer> bodyInt) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'listIntBodyParamOptNil'");
	}

}
