package dev.rsdlang.sample.server.service.handler.body;

import java.time.LocalDate;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BodyParameterTypesServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleLocalDateBodyParamHandlerImpl
		implements BodyParameterTypesServiceImpl.SimpleLocalDateBodyParamHandler {

	@Override
	public LocalDate simpleLocalDateBodyParam(BuilderFactory _factory, LocalDate bodyLocalDate) {
		return bodyLocalDate;
	}

}
