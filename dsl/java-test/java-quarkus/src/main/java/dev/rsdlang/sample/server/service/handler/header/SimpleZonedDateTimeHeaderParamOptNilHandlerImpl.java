package dev.rsdlang.sample.server.service.handler.header;

import java.time.ZonedDateTime;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.HeaderParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import dev.rsdlang.sample.server.service.model._Base.Nillable;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleZonedDateTimeHeaderParamOptNilHandlerImpl
		implements HeaderParameterTypesServiceImpl.SimpleZonedDateTimeHeaderParamOptNilHandler {

	@Override
	public NilResult simpleZonedDateTimeHeaderParamOptNil(BuilderFactory _factory, Nillable<ZonedDateTime> headerValue) {
		if (headerValue.isUndefined()) {
			return NilResult.UNDEFINED;
		} else if (headerValue.isNull()) {
			return NilResult.NULL;
		} else {
			return NilResult.DEFINED;
		}
	}

}
