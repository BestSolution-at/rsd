package dev.rsdlang.sample.server.service.handler.listquery;

import java.time.LocalDate;
import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListQueryParameterTypesServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListLocalDateQueryParamHandlerImpl
		implements ListQueryParameterTypesServiceImpl.ListLocalDateQueryParamHandler {

	@Override
	public List<LocalDate> listLocalDateQueryParam(BuilderFactory _factory, List<LocalDate> queryValue) {
		return queryValue;
	}

}
