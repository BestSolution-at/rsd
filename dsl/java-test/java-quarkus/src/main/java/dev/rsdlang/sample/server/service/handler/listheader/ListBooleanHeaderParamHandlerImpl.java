package dev.rsdlang.sample.server.service.handler.listheader;

import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListHeaderParameterTypesServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListBooleanHeaderParamHandlerImpl
		implements ListHeaderParameterTypesServiceImpl.ListBooleanHeaderParamHandler {

	@Override
	public List<Boolean> listBooleanHeaderParam(BuilderFactory _factory, List<Boolean> headerValue) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'listBooleanHeaderParam'");
	}

}
