package dev.rsdlang.sample.server.service.handler.listheader;

import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListHeaderParameterTypesServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListLongHeaderParamHandlerImpl implements ListHeaderParameterTypesServiceImpl.ListLongHeaderParamHandler {

	@Override
	public List<Long> listLongHeaderParam(BuilderFactory _factory, List<Long> headerValue) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'listLongHeaderParam'");
	}

}
