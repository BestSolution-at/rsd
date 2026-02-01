package dev.rsdlang.sample.server.service.handler.listquery;

import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListQueryParameterTypesServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListIntQueryParamHandlerImpl
		implements ListQueryParameterTypesServiceImpl.ListIntQueryParamHandler {

	@Override
	public List<Integer> listIntQueryParam(BuilderFactory _factory, List<Integer> queryValue) {
		return queryValue;
	}

}
