package dev.rsdlang.sample.server.service.handler.path;

import java.time.LocalTime;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.PathParameterTypeServiceServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleLocalTimePathParamHandlerImpl
		implements PathParameterTypeServiceServiceImpl.SimpleLocalTimePathParamHandler {

	@Override
	public LocalTime simpleLocalTimePathParam(BuilderFactory _factory, LocalTime pathLocalTime) {
		return pathLocalTime;
	}

}
