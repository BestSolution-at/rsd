package dev.rsdlang.sample.server.service.handler.body;

import java.time.LocalDate;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import dev.rsdlang.sample.server.service.model._Base.Nillable;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleLocalDateBodyParamOptNilHandlerImpl
		implements BodyParameterTypesServiceImpl.SimpleLocalDateBodyParamOptNilHandler {

	@Override
	public NilResult simpleLocalDateBodyParamOptNil(BuilderFactory _factory, Nillable<LocalDate> bodyLocalDate) {
		if (bodyLocalDate.isNull()) {
			return NilResult.NULL;
		} else if (bodyLocalDate.isUndefined()) {
			return NilResult.UNDEFINED;
		} else {
			return NilResult.DEFINED;
		}
	}

}
