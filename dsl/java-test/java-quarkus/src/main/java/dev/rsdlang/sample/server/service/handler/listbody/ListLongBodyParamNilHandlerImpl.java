package dev.rsdlang.sample.server.service.handler.listbody;

import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListBodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListLongBodyParamNilHandlerImpl implements ListBodyParameterTypesServiceImpl.ListLongBodyParamNilHandler {

	@Override
	public NilResult listLongBodyParamNil(BuilderFactory _factory, List<Long> bodyLong) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'listLongBodyParamNil'");
	}

}
