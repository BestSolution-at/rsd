package dev.rsdlang.sample.server.service.handler.listbody;

import java.time.ZoneId;
import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListBodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;

public class ListScalarBodyParamOptNilHandlerImpl
		implements ListBodyParameterTypesServiceImpl.ListScalarBodyParamOptNilHandler {

	@Override
	public NilResult listScalarBodyParamOptNil(BuilderFactory _factory, List<ZoneId> bodyScalar) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'listScalarBodyParamOptNil'");
	}

}
