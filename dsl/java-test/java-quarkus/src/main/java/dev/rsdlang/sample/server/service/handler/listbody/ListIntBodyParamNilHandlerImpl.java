package dev.rsdlang.sample.server.service.handler.listbody;

import java.util.List;
import java.util.Optional;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListBodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListIntBodyParamNilHandlerImpl implements ListBodyParameterTypesServiceImpl.ListIntBodyParamNilHandler {

	@Override
	public NilResult listIntBodyParamNil(BuilderFactory _factory, Optional<List<Integer>> bodyInt) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'listIntBodyParamNil'");
	}

}
