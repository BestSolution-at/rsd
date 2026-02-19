package dev.rsdlang.sample.server.service.handler.body;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BodyParameterTypesServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleFloatBodyParamHandlerImpl implements BodyParameterTypesServiceImpl.SimpleFloatBodyParamHandler {

	@Override
	public float simpleFloatBodyParam(BuilderFactory _factory, float bodyFloat) {
		return bodyFloat;
	}

}
