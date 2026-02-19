package dev.rsdlang.sample.server.service.handler.listbody;

import java.util.List;
import java.util.Optional;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListBodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListShortBodyParamNilHandlerImpl
		implements ListBodyParameterTypesServiceImpl.ListShortBodyParamNilHandler {

	@Override
	public NilResult listShortBodyParamNil(BuilderFactory _factory, Optional<List<Short>> bodyShort) {
		return bodyShort.isPresent() ? NilResult.DEFINED : NilResult.NULL;
	}

}
