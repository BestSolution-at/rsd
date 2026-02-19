package dev.rsdlang.sample.server.service.handler.body;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import dev.rsdlang.sample.server.service.model._Base.Nillable;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleIntBodyParamOptNilHandlerImpl
		implements BodyParameterTypesServiceImpl.SimpleIntBodyParamOptNilHandler {

	@Override
	public NilResult simpleIntBodyParamOptNil(BuilderFactory _factory, Nillable<Integer> bodyInt) {
		if (bodyInt.isNull()) {
			return NilResult.NULL;
		} else if (bodyInt.isUndefined()) {
			return NilResult.UNDEFINED;
		} else {
			return NilResult.DEFINED;
		}
	}

}
