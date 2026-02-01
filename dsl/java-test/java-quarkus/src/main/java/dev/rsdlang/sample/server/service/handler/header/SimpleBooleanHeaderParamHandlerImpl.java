package dev.rsdlang.sample.server.service.handler.header;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.HeaderParameterTypesServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleBooleanHeaderParamHandlerImpl
		implements HeaderParameterTypesServiceImpl.SimpleBooleanHeaderParamHandler {

	@Override
	public boolean simpleBooleanHeaderParam(BuilderFactory _factory, boolean headerValue) {
		return headerValue;
	}

}
