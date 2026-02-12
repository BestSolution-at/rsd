package dev.rsdlang.sample.server.service.handler.listheader;

import java.util.List;
import java.util.Optional;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListHeaderParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListBooleanHeaderParamNilHandlerImpl
		implements ListHeaderParameterTypesServiceImpl.ListBooleanHeaderParamNilHandler {

	@Override
	public NilResult listBooleanHeaderParamNil(BuilderFactory _factory, Optional<List<Boolean>> headerValue) {
		return headerValue.isPresent() ? NilResult.DEFINED : NilResult.NULL;
	}

}
