package dev.rsdlang.sample.server.service.handler.header;

import java.time.LocalDateTime;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.HeaderParameterTypesServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleLocalDateTimeHeaderParamHandlerImpl
		implements HeaderParameterTypesServiceImpl.SimpleLocalDateTimeHeaderParamHandler {

	@Override
	public LocalDateTime simpleLocalDateTimeHeaderParam(BuilderFactory _factory, LocalDateTime headerValue) {
		return headerValue;
	}

}
