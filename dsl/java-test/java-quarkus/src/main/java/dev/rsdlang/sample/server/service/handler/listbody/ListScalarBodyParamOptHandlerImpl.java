package dev.rsdlang.sample.server.service.handler.listbody;

import java.time.ZoneId;
import java.util.List;
import java.util.Optional;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListBodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListScalarBodyParamOptHandlerImpl
		implements ListBodyParameterTypesServiceImpl.ListScalarBodyParamOptHandler {

	@Override
	public NilResult listScalarBodyParamOpt(BuilderFactory _factory, Optional<List<ZoneId>> bodyScalar) {
		return bodyScalar.isPresent() ? NilResult.DEFINED : NilResult.UNDEFINED;
	}

}
