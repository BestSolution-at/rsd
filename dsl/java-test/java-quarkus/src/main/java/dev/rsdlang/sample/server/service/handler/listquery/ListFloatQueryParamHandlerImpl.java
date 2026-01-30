package dev.rsdlang.sample.server.service.handler.listquery;

import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListQueryParameterTypesServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListFloatQueryParamHandlerImpl
		implements ListQueryParameterTypesServiceImpl.ListFloatQueryParamHandler {

	@Override
	public List<Float> listFloatQueryParam(BuilderFactory _factory, List<Float> queryValue) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'listFloatQueryParam'");
	}

}
