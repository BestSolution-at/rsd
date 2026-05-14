package dev.rsdlang.sample.server.service.handler.listbody;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Optional;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListBodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListOffsetDateTimeBodyParamNilHandlerImpl
		implements ListBodyParameterTypesServiceImpl.ListOffsetDateTimeBodyParamNilHandler {

	@Override
	public NilResult listOffsetDateTimeBodyParamNil(BuilderFactory _factory, Optional<List<OffsetDateTime>> bodyOffsetDateTime) {
		return bodyOffsetDateTime.isPresent() ? NilResult.DEFINED : NilResult.NULL;
	}

}