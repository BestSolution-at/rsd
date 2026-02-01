package dev.rsdlang.sample.server.service.handler.listquery;

import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListQueryParameterTypesServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListShortQueryParamHandlerImpl implements ListQueryParameterTypesServiceImpl.ListShortQueryParamHandler {

	@Override
	public List<Short> listShortQueryParam(BuilderFactory _factory, List<Short> queryValue) {
		return queryValue;
	}

}
