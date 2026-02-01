package dev.rsdlang.sample.server.service.handler.listquery;

import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListQueryParameterTypesServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListLongQueryParamHandlerImpl
		implements ListQueryParameterTypesServiceImpl.ListLongQueryParamHandler {

	@Override
	public List<Long> listLongQueryParam(BuilderFactory _factory, List<Long> queryValue) {
		return queryValue;
	}

}
