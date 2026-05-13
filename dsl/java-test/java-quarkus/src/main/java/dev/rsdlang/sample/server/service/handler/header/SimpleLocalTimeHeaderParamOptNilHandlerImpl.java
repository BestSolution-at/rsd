package dev.rsdlang.sample.server.service.handler.header;

import java.time.LocalTime;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.HeaderParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import dev.rsdlang.sample.server.service.model._Base.Nillable;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleLocalTimeHeaderParamOptNilHandlerImpl
		implements HeaderParameterTypesServiceImpl.SimpleLocalTimeHeaderParamOptNilHandler {

	@Override
	public NilResult simpleLocalTimeHeaderParamOptNil(BuilderFactory _factory, Nillable<LocalTime> headerValue) {
		if (headerValue.isNull()) {
			return NilResult.NULL;
		} else if (headerValue.isUndefined()) {
			return NilResult.UNDEFINED;
		} else {
			return NilResult.DEFINED;
		}
	}

}
