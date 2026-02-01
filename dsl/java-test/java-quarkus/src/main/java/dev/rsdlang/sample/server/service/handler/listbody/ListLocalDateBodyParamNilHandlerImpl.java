package dev.rsdlang.sample.server.service.handler.listbody;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListBodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListLocalDateBodyParamNilHandlerImpl
		implements ListBodyParameterTypesServiceImpl.ListLocalDateBodyParamNilHandler {

	@Override
	public NilResult listLocalDateBodyParamNil(BuilderFactory _factory, Optional<List<LocalDate>> bodyLocalDate) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'listLocalDateBodyParamNil'");
	}

}
