package dev.rsdlang.sample.server.service.handler.path;

import java.time.LocalDateTime;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.PathParameterTypeServiceServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleLocalDateTimePathParamHandlerImpl
		implements PathParameterTypeServiceServiceImpl.SimpleLocalDateTimePathParamHandler {

	@Override
	public LocalDateTime simpleLocalDateTimePathParam(BuilderFactory _factory, LocalDateTime pathLocalDateTime) {
		return pathLocalDateTime;
	}

}
