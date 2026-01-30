package dev.rsdlang.sample.server.service.handler.listheader;

import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListHeaderParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListLongHeaderParamNilHandlerImpl
		implements ListHeaderParameterTypesServiceImpl.ListLongHeaderParamNilHandler {

	@Override
	public NilResult listLongHeaderParamNil(BuilderFactory _factory, List<Long> headerValue) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'listLongHeaderParamNil'");
	}

}
