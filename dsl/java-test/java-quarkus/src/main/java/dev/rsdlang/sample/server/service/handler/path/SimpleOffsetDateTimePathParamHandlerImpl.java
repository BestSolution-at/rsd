package dev.rsdlang.sample.server.service.handler.path;

import java.time.OffsetDateTime;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.PathParameterTypeServiceServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleOffsetDateTimePathParamHandlerImpl
		implements PathParameterTypeServiceServiceImpl.SimpleOffsetDateTimePathParamHandler {

	@Override
	public OffsetDateTime simpleOffsetDateTimePathParam(BuilderFactory _factory, OffsetDateTime pathOffsetDateTime) {
		return pathOffsetDateTime;
	}

}