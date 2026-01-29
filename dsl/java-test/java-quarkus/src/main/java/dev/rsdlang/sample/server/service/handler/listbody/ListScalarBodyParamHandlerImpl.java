package dev.rsdlang.sample.server.service.handler.listbody;

import java.time.ZoneId;
import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListBodyParameterTypesServiceImpl;

public class ListScalarBodyParamHandlerImpl implements ListBodyParameterTypesServiceImpl.ListScalarBodyParamHandler {

	@Override
	public List<ZoneId> listScalarBodyParam(BuilderFactory _factory, List<ZoneId> bodyScalar) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'listScalarBodyParam'");
	}

}
