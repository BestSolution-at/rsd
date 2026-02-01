package dev.rsdlang.sample.server.service.handler.listbody;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListBodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListLocalDateTimeBodyParamNilHandlerImpl
		implements ListBodyParameterTypesServiceImpl.ListLocalDateTimeBodyParamNilHandler {

	@Override
	public NilResult listLocalDateTimeBodyParamNil(BuilderFactory _factory,
			Optional<List<LocalDateTime>> bodyLocalDateTime) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'listLocalDateTimeBodyParamNil'");
	}

}
