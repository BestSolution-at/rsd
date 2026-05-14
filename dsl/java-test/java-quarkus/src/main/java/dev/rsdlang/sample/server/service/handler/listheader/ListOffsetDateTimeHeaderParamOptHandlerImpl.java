package dev.rsdlang.sample.server.service.handler.listheader;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Optional;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListHeaderParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListOffsetDateTimeHeaderParamOptHandlerImpl
		implements ListHeaderParameterTypesServiceImpl.ListOffsetDateTimeHeaderParamOptHandler {

	@Override
	public NilResult listOffsetDateTimeHeaderParamOpt(BuilderFactory _factory, Optional<List<OffsetDateTime>> headerValue) {
		return headerValue.isPresent() ? NilResult.DEFINED : NilResult.UNDEFINED;
	}

}