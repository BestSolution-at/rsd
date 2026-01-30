package dev.rsdlang.sample.server.service.handler.path;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.PathParameterTypeServiceServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleDoublePathParamHandlerImpl
		implements PathParameterTypeServiceServiceImpl.SimpleDoublePathParamHandler {

	@Override
	public double simpleDoublePathParam(BuilderFactory _factory, double pathDouble) {
		return pathDouble;
	}

}
