package dev.rsdlang.sample.server.service.handler.body;

import java.time.OffsetDateTime;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import dev.rsdlang.sample.server.service.model._Base.Nillable;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleOffsetDateTimeBodyParamOptNilHandlerImpl
		implements BodyParameterTypesServiceImpl.SimpleOffsetDateTimeBodyParamOptNilHandler {

	@Override
	public NilResult simpleOffsetDateTimeBodyParamOptNil(BuilderFactory _factory, Nillable<OffsetDateTime> bodyOffsetDateTime) {
		if (bodyOffsetDateTime.isNull()) {
			return NilResult.NULL;
		} else if (bodyOffsetDateTime.isUndefined()) {
			return NilResult.UNDEFINED;
		} else {
			return NilResult.DEFINED;
		}
	}

}