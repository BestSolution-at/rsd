package dev.rsdlang.sample.server.service.handler.listbody;

import java.util.List;
import java.util.Optional;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListBodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListBooleanBodyParamOptHandlerImpl
		implements ListBodyParameterTypesServiceImpl.ListBooleanBodyParamOptHandler {

	@Override
	public NilResult listBooleanBodyParamOpt(BuilderFactory _factory, Optional<List<Boolean>> bodyBoolean) {
		return bodyBoolean.isPresent() ? NilResult.DEFINED : NilResult.UNDEFINED;
	}

}
