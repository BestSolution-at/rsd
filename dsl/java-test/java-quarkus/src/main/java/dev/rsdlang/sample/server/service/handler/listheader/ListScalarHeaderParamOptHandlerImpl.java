package dev.rsdlang.sample.server.service.handler.listheader;

import java.time.ZoneId;
import java.util.List;
import java.util.Optional;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListHeaderParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListScalarHeaderParamOptHandlerImpl
		implements ListHeaderParameterTypesServiceImpl.ListScalarHeaderParamOptHandler {

	@Override
	public NilResult listScalarHeaderParamOpt(BuilderFactory _factory, Optional<List<ZoneId>> headerValue) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'listScalarHeaderParamOpt'");
	}

}
