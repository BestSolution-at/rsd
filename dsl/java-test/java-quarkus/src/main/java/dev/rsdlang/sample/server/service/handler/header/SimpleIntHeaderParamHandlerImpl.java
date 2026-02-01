package dev.rsdlang.sample.server.service.handler.header;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.HeaderParameterTypesServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleIntHeaderParamHandlerImpl implements HeaderParameterTypesServiceImpl.SimpleIntHeaderParamHandler {

	@Override
	public int simpleIntHeaderParam(BuilderFactory _factory, int headerValue) {
		return headerValue;
	}

}
