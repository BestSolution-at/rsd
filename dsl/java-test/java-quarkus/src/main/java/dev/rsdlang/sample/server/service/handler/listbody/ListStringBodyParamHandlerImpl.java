package dev.rsdlang.sample.server.service.handler.listbody;

import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListBodyParameterTypesServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListStringBodyParamHandlerImpl implements ListBodyParameterTypesServiceImpl.ListStringBodyParamHandler {

	@Override
	public List<String> listStringBodyParam(BuilderFactory _factory, List<String> bodyString) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'listStringBodyParam'");
	}

}
