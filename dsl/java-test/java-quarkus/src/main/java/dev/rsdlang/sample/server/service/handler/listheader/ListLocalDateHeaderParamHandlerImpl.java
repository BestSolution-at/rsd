package dev.rsdlang.sample.server.service.handler.listheader;

import java.time.LocalDate;
import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListHeaderParameterTypesServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListLocalDateHeaderParamHandlerImpl
		implements ListHeaderParameterTypesServiceImpl.ListLocalDateHeaderParamHandler {

	@Override
	public List<LocalDate> listLocalDateHeaderParam(BuilderFactory _factory, List<LocalDate> headerValue) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'listLocalDateHeaderParam'");
	}

}
