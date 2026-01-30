package dev.rsdlang.sample.server.service.handler.listbody;

import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListBodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListDoubleBodyParamNilHandlerImpl
		implements ListBodyParameterTypesServiceImpl.ListDoubleBodyParamNilHandler {

	@Override
	public NilResult listDoubleBodyParamNil(BuilderFactory _factory, List<Double> bodyDouble) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'listDoubleBodyParamNil'");
	}

}
