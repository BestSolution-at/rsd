package dev.rsdlang.sample.server.service.handler.listquery;

import java.time.LocalTime;
import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListQueryParameterTypesServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListLocalTimeQueryParamHandlerImpl
		implements ListQueryParameterTypesServiceImpl.ListLocalTimeQueryParamHandler {

	@Override
	public List<LocalTime> listLocalTimeQueryParam(BuilderFactory _factory, List<LocalTime> queryValue) {
		return queryValue;
	}

}
