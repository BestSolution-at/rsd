package dev.rsdlang.sample.server.service.handler.header;

import java.time.LocalDate;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.HeaderParameterTypesServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleLocalDateHeaderParamHandlerImpl
		implements HeaderParameterTypesServiceImpl.SimpleLocalDateHeaderParamHandler {

	@Override
	public LocalDate simpleLocalDateHeaderParam(BuilderFactory _factory, LocalDate headerValue) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'simpleLocalDateHeaderParam'");
	}

}
