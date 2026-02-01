package dev.rsdlang.sample.server.service.handler.header;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.HeaderParameterTypesServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleStringHeaderParamHandlerImpl
		implements HeaderParameterTypesServiceImpl.SimpleStringHeaderParamHandler {

	@Override
	public String simpleStringHeaderParam(BuilderFactory _factory, String headerValue) {
		return headerValue;
	}

}
