package dev.rsdlang.sample.server.service.handler.listbody;

import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListBodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListBooleanBodyParamOptHandlerImpl
		implements ListBodyParameterTypesServiceImpl.ListBooleanBodyParamOptHandler {

	@Override
	public NilResult listBooleanBodyParamOpt(BuilderFactory _factory, List<Boolean> bodyBoolean) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'listBooleanBodyParamOpt'");
	}

}
