package dev.rsdlang.sample.server.service.handler.body;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import dev.rsdlang.sample.server.service.model._Base.Nillable;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleBooleanBodyParamOptNilHandlerImpl
		implements BodyParameterTypesServiceImpl.SimpleBooleanBodyParamOptNilHandler {

	@Override
	public NilResult simpleBooleanBodyParamOptNil(BuilderFactory _factory, Nillable<Boolean> bodyBoolean) {
		if (bodyBoolean.isNull()) {
			return NilResult.NULL;
		} else if (bodyBoolean.isUndefined()) {
			return NilResult.UNDEFINED;
		} else {
			return NilResult.DEFINED;
		}
	}

}
