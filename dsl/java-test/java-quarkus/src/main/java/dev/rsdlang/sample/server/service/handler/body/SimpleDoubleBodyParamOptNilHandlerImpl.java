package dev.rsdlang.sample.server.service.handler.body;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import dev.rsdlang.sample.server.service.model._Base.Nillable;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleDoubleBodyParamOptNilHandlerImpl
		implements BodyParameterTypesServiceImpl.SimpleDoubleBodyParamOptNilHandler {

	@Override
	public NilResult simpleDoubleBodyParamOptNil(BuilderFactory _factory, Nillable<Double> bodyDouble) {
		if (bodyDouble.isNull()) {
			return NilResult.NULL;
		} else if (bodyDouble.isUndefined()) {
			return NilResult.UNDEFINED;
		} else {
			return NilResult.DEFINED;
		}
	}

}
