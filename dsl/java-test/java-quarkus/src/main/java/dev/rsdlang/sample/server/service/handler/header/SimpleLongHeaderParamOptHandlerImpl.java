package dev.rsdlang.sample.server.service.handler.header;

import java.util.OptionalLong;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.HeaderParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleLongHeaderParamOptHandlerImpl
		implements HeaderParameterTypesServiceImpl.SimpleLongHeaderParamOptHandler {

	@Override
	public NilResult simpleLongHeaderParamOpt(BuilderFactory _factory, OptionalLong headerValue) {
		return headerValue.isPresent() ? NilResult.DEFINED : NilResult.UNDEFINED;
	}

}
