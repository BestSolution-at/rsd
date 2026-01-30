package dev.rsdlang.sample.server.service.handler.listbody;

import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListBodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListLongBodyParamOptHandlerImpl implements ListBodyParameterTypesServiceImpl.ListLongBodyParamOptHandler {

	@Override
	public NilResult listLongBodyParamOpt(BuilderFactory _factory, List<Long> bodyLong) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'listLongBodyParamOpt'");
	}

}
