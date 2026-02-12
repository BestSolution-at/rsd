package dev.rsdlang.sample.server.service.handler.listheader;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListHeaderParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListLocalDateTimeHeaderParamOptHandlerImpl
		implements ListHeaderParameterTypesServiceImpl.ListLocalDateTimeHeaderParamOptHandler {

	@Override
	public NilResult listLocalDateTimeHeaderParamOpt(BuilderFactory _factory, Optional<List<LocalDateTime>> headerValue) {
		return headerValue.isPresent() ? NilResult.DEFINED : NilResult.UNDEFINED;
	}

}
