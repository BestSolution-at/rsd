package dev.rsdlang.sample.server.service.handler.listquery;

import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListQueryParameterTypesServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListDoubleQueryParamHandlerImpl
		implements ListQueryParameterTypesServiceImpl.ListDoubleQueryParamHandler {

	@Override
	public List<Double> listDoubleQueryParam(BuilderFactory _factory, List<Double> queryValue) {
		return queryValue;
	}

}
