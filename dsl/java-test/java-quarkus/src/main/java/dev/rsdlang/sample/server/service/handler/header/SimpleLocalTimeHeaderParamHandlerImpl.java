package dev.rsdlang.sample.server.service.handler.header;

import java.time.LocalTime;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.HeaderParameterTypesServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleLocalTimeHeaderParamHandlerImpl
		implements HeaderParameterTypesServiceImpl.SimpleLocalTimeHeaderParamHandler {

	@Override
	public LocalTime simpleLocalTimeHeaderParam(BuilderFactory _factory, LocalTime headerValue) {
		return headerValue;
	}

}
