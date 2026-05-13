package dev.rsdlang.sample.server.service.handler.listheader;

import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListHeaderParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListLocalTimeHeaderParamNilHandlerImpl
		implements ListHeaderParameterTypesServiceImpl.ListLocalTimeHeaderParamNilHandler {

	@Override
	public NilResult listLocalTimeHeaderParamNil(BuilderFactory _factory, Optional<List<LocalTime>> headerValue) {
		return headerValue.isPresent() ? NilResult.DEFINED : NilResult.NULL;
	}

}
