package dev.rsdlang.sample.server.service.handler.body;

import java.time.LocalTime;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import dev.rsdlang.sample.server.service.model._Base.Nillable;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleLocalTimeBodyParamOptNilHandlerImpl
		implements BodyParameterTypesServiceImpl.SimpleLocalTimeBodyParamOptNilHandler {

	@Override
	public NilResult simpleLocalTimeBodyParamOptNil(BuilderFactory _factory, Nillable<LocalTime> bodyLocalTime) {
		if (bodyLocalTime.isNull()) {
			return NilResult.NULL;
		} else if (bodyLocalTime.isUndefined()) {
			return NilResult.UNDEFINED;
		} else {
			return NilResult.DEFINED;
		}
	}

}
