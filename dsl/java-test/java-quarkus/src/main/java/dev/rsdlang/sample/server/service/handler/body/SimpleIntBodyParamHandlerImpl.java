package dev.rsdlang.sample.server.service.handler.body;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BodyParameterTypesServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleIntBodyParamHandlerImpl implements BodyParameterTypesServiceImpl.SimpleIntBodyParamHandler {

	@Override
	public int simpleIntBodyParam(BuilderFactory _factory, int bodyInt) {
		return bodyInt;
	}

}
