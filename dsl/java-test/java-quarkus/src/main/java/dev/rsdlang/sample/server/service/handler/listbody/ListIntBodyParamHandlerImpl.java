package dev.rsdlang.sample.server.service.handler.listbody;

import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListBodyParameterTypesServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListIntBodyParamHandlerImpl implements ListBodyParameterTypesServiceImpl.ListIntBodyParamHandler {

	@Override
	public List<Integer> listIntBodyParam(BuilderFactory _factory, List<Integer> bodyInt) {
		return bodyInt;
	}

}
