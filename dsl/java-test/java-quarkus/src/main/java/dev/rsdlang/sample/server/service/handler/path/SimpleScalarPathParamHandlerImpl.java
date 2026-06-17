package dev.rsdlang.sample.server.service.handler.path;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.PathParameterTypeServiceServiceImpl;
import dev.rsdlang.sample.server.service.model.ZoneId;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleScalarPathParamHandlerImpl
		implements PathParameterTypeServiceServiceImpl.SimpleScalarPathParamHandler {

	@Override
	public ZoneId simpleScalarPathParam(BuilderFactory _factory, ZoneId pathScalar) {
		return pathScalar;
	}

}
