package dev.rsdlang.sample.server.service.handler.listheader;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListHeaderParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListLocalDateHeaderParamNilHandlerImpl
		implements ListHeaderParameterTypesServiceImpl.ListLocalDateHeaderParamNilHandler {

	@Override
	public NilResult listLocalDateHeaderParamNil(BuilderFactory _factory, Optional<List<LocalDate>> headerValue) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'listLocalDateHeaderParamNil'");
	}

}
