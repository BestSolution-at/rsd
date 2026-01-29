package dev.rsdlang.sample.server.service.handler.listheader;

import java.time.ZoneId;
import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListHeaderParameterTypesServiceImpl;

public class ListScalarHeaderParamHandlerImpl
		implements ListHeaderParameterTypesServiceImpl.ListScalarHeaderParamHandler {

	@Override
	public List<ZoneId> listScalarHeaderParam(BuilderFactory _factory, List<ZoneId> headerValue) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'listScalarHeaderParam'");
	}

}
