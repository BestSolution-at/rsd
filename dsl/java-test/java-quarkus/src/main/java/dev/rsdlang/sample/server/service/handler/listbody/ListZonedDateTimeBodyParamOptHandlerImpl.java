package dev.rsdlang.sample.server.service.handler.listbody;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListBodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListZonedDateTimeBodyParamOptHandlerImpl
		implements ListBodyParameterTypesServiceImpl.ListZonedDateTimeBodyParamOptHandler {

	@Override
	public NilResult listZonedDateTimeBodyParamOpt(BuilderFactory _factory,
			Optional<List<ZonedDateTime>> bodyZonedDateTime) {
		return bodyZonedDateTime.isPresent() ? NilResult.DEFINED : NilResult.UNDEFINED;
	}

}
