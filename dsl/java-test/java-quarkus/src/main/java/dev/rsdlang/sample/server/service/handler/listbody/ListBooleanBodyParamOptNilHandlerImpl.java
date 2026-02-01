package dev.rsdlang.sample.server.service.handler.listbody;

import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListBodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import dev.rsdlang.sample.server.service.model._Base.Nillable;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListBooleanBodyParamOptNilHandlerImpl
		implements ListBodyParameterTypesServiceImpl.ListBooleanBodyParamOptNilHandler {

	@Override
	public NilResult listBooleanBodyParamOptNil(BuilderFactory _factory, Nillable<List<Boolean>> bodyBoolean) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'listBooleanBodyParamOptNil'");
	}

}
