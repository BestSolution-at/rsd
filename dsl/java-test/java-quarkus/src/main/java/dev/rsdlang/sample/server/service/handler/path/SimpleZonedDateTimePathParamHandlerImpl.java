package dev.rsdlang.sample.server.service.handler.path;

import java.time.ZonedDateTime;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.PathParameterTypeServiceServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleZonedDateTimePathParamHandlerImpl
		implements PathParameterTypeServiceServiceImpl.SimpleZonedDateTimePathParamHandler {

	@Override
	public ZonedDateTime simpleZonedDateTimePathParam(BuilderFactory _factory, ZonedDateTime pathZonedDateTime) {
		return pathZonedDateTime;
	}

}
