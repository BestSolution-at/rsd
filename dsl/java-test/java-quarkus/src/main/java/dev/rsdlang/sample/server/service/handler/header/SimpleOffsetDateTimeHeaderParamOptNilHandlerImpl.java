package dev.rsdlang.sample.server.service.handler.header;

import java.time.OffsetDateTime;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.HeaderParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import dev.rsdlang.sample.server.service.model._Base.Nillable;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleOffsetDateTimeHeaderParamOptNilHandlerImpl
		implements HeaderParameterTypesServiceImpl.SimpleOffsetDateTimeHeaderParamOptNilHandler {

	@Override
	public NilResult simpleOffsetDateTimeHeaderParamOptNil(BuilderFactory _factory, Nillable<OffsetDateTime> headerValue) {
		if (headerValue.isNull()) {
			return NilResult.NULL;
		} else if (headerValue.isUndefined()) {
			return NilResult.UNDEFINED;
		} else {
			return NilResult.DEFINED;
		}
	}

}