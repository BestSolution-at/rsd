package dev.rsdlang.sample.server.service.handler.listheader;

import java.time.ZoneId;
import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListHeaderParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListScalarHeaderParamOptNilHandlerImpl
		implements ListHeaderParameterTypesServiceImpl.ListScalarHeaderParamOptNilHandler {

	@Override
	public NilResult listScalarHeaderParamOptNil(BuilderFactory _factory, List<ZoneId> headerValue) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'listScalarHeaderParamOptNil'");
	}

}
