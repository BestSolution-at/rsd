package dev.rsdlang.sample.server.service.handler.listbody;

import java.time.ZoneId;
import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListBodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;

public class ListScalarBodyParamNilHandlerImpl
		implements ListBodyParameterTypesServiceImpl.ListScalarBodyParamNilHandler {

	@Override
	public NilResult listScalarBodyParamNil(BuilderFactory _factory, List<ZoneId> bodyScalar) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'listScalarBodyParamNil'");
	}

}
