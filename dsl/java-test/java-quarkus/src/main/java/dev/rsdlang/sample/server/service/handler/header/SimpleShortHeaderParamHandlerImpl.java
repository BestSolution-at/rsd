package dev.rsdlang.sample.server.service.handler.header;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.HeaderParameterTypesServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleShortHeaderParamHandlerImpl
		implements HeaderParameterTypesServiceImpl.SimpleShortHeaderParamHandler {

	@Override
	public short simpleShortHeaderParam(BuilderFactory _factory, short headerValue) {
		return headerValue;
	}

}
