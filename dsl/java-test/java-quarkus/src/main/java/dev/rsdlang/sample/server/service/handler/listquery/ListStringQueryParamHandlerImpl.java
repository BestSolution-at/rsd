package dev.rsdlang.sample.server.service.handler.listquery;

import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListQueryParameterTypesServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListStringQueryParamHandlerImpl implements ListQueryParameterTypesServiceImpl.ListStringQueryParamHandler {

	@Override
	public List<String> listStringQueryParam(BuilderFactory _factory, List<String> queryValue) {
		return queryValue;
	}

}
