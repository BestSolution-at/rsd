package dev.rsdlang.sample.server.service.handler.listbody;

import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListBodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListLocalTimeBodyParamOptHandlerImpl
		implements ListBodyParameterTypesServiceImpl.ListLocalTimeBodyParamOptHandler {

	@Override
	public NilResult listLocalTimeBodyParamOpt(BuilderFactory _factory, Optional<List<LocalTime>> bodyLocalTime) {
		return bodyLocalTime.isPresent() ? NilResult.DEFINED : NilResult.UNDEFINED;
	}

}
