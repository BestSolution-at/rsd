package dev.rsdlang.sample.server.service.handler.listbody;

import java.time.ZoneId;
import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListBodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import dev.rsdlang.sample.server.service.model._Base.Nillable;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListScalarBodyParamOptNilHandlerImpl
		implements ListBodyParameterTypesServiceImpl.ListScalarBodyParamOptNilHandler {

	@Override
	public NilResult listScalarBodyParamOptNil(BuilderFactory _factory, Nillable<List<ZoneId>> bodyScalar) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'listScalarBodyParamOptNil'");
	}

}
