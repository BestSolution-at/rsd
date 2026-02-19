package dev.rsdlang.sample.server.service.handler.body;

import java.time.LocalDateTime;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import dev.rsdlang.sample.server.service.model._Base.Nillable;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleLocalDateTimeBodyParamOptNilHandlerImpl
		implements BodyParameterTypesServiceImpl.SimpleLocalDateTimeBodyParamOptNilHandler {

	@Override
	public NilResult simpleLocalDateTimeBodyParamOptNil(BuilderFactory _factory,
			Nillable<LocalDateTime> bodyLocalDateTime) {
		if (bodyLocalDateTime.isNull()) {
			return NilResult.NULL;
		} else if (bodyLocalDateTime.isUndefined()) {
			return NilResult.UNDEFINED;
		} else {
			return NilResult.DEFINED;
		}
	}

}
