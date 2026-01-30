package dev.rsdlang.sample.server.service.handler.listbody;

import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListBodyParameterTypesServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListFloatBodyParamHandlerImpl implements ListBodyParameterTypesServiceImpl.ListFloatBodyParamHandler {

	@Override
	public List<Float> listFloatBodyParam(BuilderFactory _factory, List<Float> bodyFloat) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'listFloatBodyParam'");
	}

}
