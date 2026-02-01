package dev.rsdlang.sample.server.service.handler.header;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.HeaderParameterTypesServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleLongHeaderParamHandlerImpl implements HeaderParameterTypesServiceImpl.SimpleLongHeaderParamHandler {

	@Override
	public long simpleLongHeaderParam(BuilderFactory _factory, long headerValue) {
		return headerValue;
	}

}
