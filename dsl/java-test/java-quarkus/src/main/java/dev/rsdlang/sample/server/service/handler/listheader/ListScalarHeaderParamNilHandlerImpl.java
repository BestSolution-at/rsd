package dev.rsdlang.sample.server.service.handler.listheader;

import java.time.ZoneId;
import java.util.List;
import java.util.Optional;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListHeaderParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListScalarHeaderParamNilHandlerImpl
		implements ListHeaderParameterTypesServiceImpl.ListScalarHeaderParamNilHandler {

	@Override
	public NilResult listScalarHeaderParamNil(BuilderFactory _factory, Optional<List<ZoneId>> headerValue) {
		return headerValue.isPresent() ? NilResult.DEFINED : NilResult.NULL;
	}

}
