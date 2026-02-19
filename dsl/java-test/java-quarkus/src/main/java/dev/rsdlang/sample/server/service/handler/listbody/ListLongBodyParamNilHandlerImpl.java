package dev.rsdlang.sample.server.service.handler.listbody;

import java.util.List;
import java.util.Optional;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListBodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListLongBodyParamNilHandlerImpl implements ListBodyParameterTypesServiceImpl.ListLongBodyParamNilHandler {

	@Override
	public NilResult listLongBodyParamNil(BuilderFactory _factory, Optional<List<Long>> bodyLong) {
		return bodyLong.isPresent() ? NilResult.DEFINED : NilResult.NULL;
	}

}
