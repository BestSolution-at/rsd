package dev.rsdlang.sample.server.service.handler.listheader;

import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListHeaderParameterTypesServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListFloatHeaderParamHandlerImpl
		implements ListHeaderParameterTypesServiceImpl.ListFloatHeaderParamHandler {

	@Override
	public List<Float> listFloatHeaderParam(BuilderFactory _factory, List<Float> headerValue) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'listFloatHeaderParam'");
	}

}
