package dev.rsdlang.sample.server.service.handler.path;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.PathParameterTypeServiceServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleStringPathParamHandlerImpl
		implements PathParameterTypeServiceServiceImpl.SimpleStringPathParamHandler {

	@Override
	public String simpleStringPathParam(BuilderFactory _factory, String pathString) {
		return pathString;
	}

}
