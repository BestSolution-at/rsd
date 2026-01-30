package dev.rsdlang.sample.server.service.handler.path;

import java.time.LocalDate;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.PathParameterTypeServiceServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleLocalDatePathParamHandlerImpl
		implements PathParameterTypeServiceServiceImpl.SimpleLocalDatePathParamHandler {

	@Override
	public LocalDate simpleLocalDatePathParam(BuilderFactory _factory, LocalDate pathLocalDate) {
		return pathLocalDate;
	}

}
