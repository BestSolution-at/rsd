package dev.rsdlang.sample.server.service.handler.listbody;

import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListBodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import dev.rsdlang.sample.server.service.model._Base.Nillable;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListDoubleBodyParamOptNilHandlerImpl
		implements ListBodyParameterTypesServiceImpl.ListDoubleBodyParamOptNilHandler {

	@Override
	public NilResult listDoubleBodyParamOptNil(BuilderFactory _factory, Nillable<List<Double>> bodyDouble) {
		if (bodyDouble.isNull()) {
			return NilResult.NULL;
		} else if (bodyDouble.isUndefined()) {
			return NilResult.UNDEFINED;
		} else {
			return NilResult.DEFINED;
		}
	}

}
