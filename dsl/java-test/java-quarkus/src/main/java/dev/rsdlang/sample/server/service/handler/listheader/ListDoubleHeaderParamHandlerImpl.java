package dev.rsdlang.sample.server.service.handler.listheader;

import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListHeaderParameterTypesServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListDoubleHeaderParamHandlerImpl
		implements ListHeaderParameterTypesServiceImpl.ListDoubleHeaderParamHandler {

	@Override
	public List<Double> listDoubleHeaderParam(BuilderFactory _factory, List<Double> headerValue) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'listDoubleHeaderParam'");
	}

}
