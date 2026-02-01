package dev.rsdlang.sample.server.service.handler.header;

import java.time.ZonedDateTime;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.HeaderParameterTypesServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleZonedDateTimeHeaderParamHandlerImpl
		implements HeaderParameterTypesServiceImpl.SimpleZonedDateTimeHeaderParamHandler {

	@Override
	public ZonedDateTime simpleZonedDateTimeHeaderParam(BuilderFactory _factory, ZonedDateTime headerValue) {
		return headerValue;
	}

}
