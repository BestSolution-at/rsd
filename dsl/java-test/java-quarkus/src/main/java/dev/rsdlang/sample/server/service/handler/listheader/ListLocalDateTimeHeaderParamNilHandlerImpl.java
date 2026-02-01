package dev.rsdlang.sample.server.service.handler.listheader;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListHeaderParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListLocalDateTimeHeaderParamNilHandlerImpl
		implements ListHeaderParameterTypesServiceImpl.ListLocalDateTimeHeaderParamNilHandler {

	@Override
	public NilResult listLocalDateTimeHeaderParamNil(BuilderFactory _factory, Optional<List<LocalDateTime>> headerValue) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'listLocalDateTimeHeaderParamNil'");
	}

}
