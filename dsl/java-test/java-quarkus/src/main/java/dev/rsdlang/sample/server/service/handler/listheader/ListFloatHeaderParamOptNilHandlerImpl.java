package dev.rsdlang.sample.server.service.handler.listheader;

import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListHeaderParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListFloatHeaderParamOptNilHandlerImpl
		implements ListHeaderParameterTypesServiceImpl.ListFloatHeaderParamOptNilHandler {

	@Override
	public NilResult listFloatHeaderParamOptNil(BuilderFactory _factory, List<Float> headerValue) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'listFloatHeaderParamOptNil'");
	}

}
