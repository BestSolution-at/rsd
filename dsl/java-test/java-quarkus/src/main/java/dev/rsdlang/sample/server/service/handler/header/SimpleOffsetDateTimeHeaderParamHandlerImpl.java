package dev.rsdlang.sample.server.service.handler.header;

import java.time.OffsetDateTime;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.HeaderParameterTypesServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleOffsetDateTimeHeaderParamHandlerImpl
		implements HeaderParameterTypesServiceImpl.SimpleOffsetDateTimeHeaderParamHandler {

	@Override
	public OffsetDateTime simpleOffsetDateTimeHeaderParam(BuilderFactory _factory, OffsetDateTime headerValue) {
		return headerValue;
	}

}