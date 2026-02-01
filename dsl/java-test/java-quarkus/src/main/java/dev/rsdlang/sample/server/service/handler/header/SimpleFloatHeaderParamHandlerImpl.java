package dev.rsdlang.sample.server.service.handler.header;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.HeaderParameterTypesServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleFloatHeaderParamHandlerImpl
		implements HeaderParameterTypesServiceImpl.SimpleFloatHeaderParamHandler {

	@Override
	public float simpleFloatHeaderParam(BuilderFactory _factory, float headerValue) {
		return headerValue;
	}

}
