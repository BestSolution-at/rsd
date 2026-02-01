package dev.rsdlang.sample.server.service.handler.listbody;

import java.util.List;
import java.util.Optional;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListBodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListBooleanBodyParamNilHandlerImpl
		implements ListBodyParameterTypesServiceImpl.ListBooleanBodyParamNilHandler {

	@Override
	public NilResult listBooleanBodyParamNil(BuilderFactory _factory, Optional<List<Boolean>> bodyBoolean) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'listBooleanBodyParamNil'");
	}

}
