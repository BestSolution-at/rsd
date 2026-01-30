package dev.rsdlang.sample.server.service.handler.path;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.PathParameterTypeServiceServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleShortPathParamHandlerImpl
		implements PathParameterTypeServiceServiceImpl.SimpleShortPathParamHandler {

	@Override
	public short simpleShortPathParam(BuilderFactory _factory, short pathShort) {
		return pathShort;
	}

}
