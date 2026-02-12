package dev.rsdlang.sample.server.service.handler.listheader;

import java.util.List;
import java.util.Optional;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListHeaderParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListFloatHeaderParamOptHandlerImpl
		implements ListHeaderParameterTypesServiceImpl.ListFloatHeaderParamOptHandler {

	@Override
	public NilResult listFloatHeaderParamOpt(BuilderFactory _factory, Optional<List<Float>> headerValue) {
		return headerValue.isPresent() ? NilResult.DEFINED : NilResult.UNDEFINED;
	}

}
