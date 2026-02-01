package dev.rsdlang.sample.server.service.handler.header;

import java.time.ZoneId;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.HeaderParameterTypesServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleScalarHeaderParamHandlerImpl
		implements HeaderParameterTypesServiceImpl.SimpleScalarHeaderParamHandler {

	@Override
	public ZoneId simpleScalarHeaderParam(BuilderFactory _factory, ZoneId headerValue) {
		return headerValue;
	}

}
