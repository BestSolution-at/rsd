package dev.rsdlang.sample.server.service.handler.header;

import java.util.OptionalDouble;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.HeaderParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleDoubleHeaderParamOptHandlerImpl
		implements HeaderParameterTypesServiceImpl.SimpleDoubleHeaderParamOptHandler {

	@Override
	public NilResult simpleDoubleHeaderParamOpt(BuilderFactory _factory, OptionalDouble headerValue) {
		return headerValue.isPresent() ? NilResult.DEFINED : NilResult.UNDEFINED;
	}

}
