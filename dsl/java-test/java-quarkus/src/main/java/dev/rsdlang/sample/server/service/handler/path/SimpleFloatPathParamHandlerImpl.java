package dev.rsdlang.sample.server.service.handler.path;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.PathParameterTypeServiceServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleFloatPathParamHandlerImpl
		implements PathParameterTypeServiceServiceImpl.SimpleFloatPathParamHandler {

	@Override
	public float simpleFloatPathParam(BuilderFactory _factory, float pathFloat) {
		return pathFloat;
	}

}
