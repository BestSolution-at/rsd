package dev.rsdlang.sample.server.service.handler.listbody;

import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListBodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import dev.rsdlang.sample.server.service.model._Base.Nillable;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListFloatBodyParamOptNilHandlerImpl
		implements ListBodyParameterTypesServiceImpl.ListFloatBodyParamOptNilHandler {

	@Override
	public NilResult listFloatBodyParamOptNil(BuilderFactory _factory, Nillable<List<Float>> bodyFloat) {
		if (bodyFloat.isNull()) {
			return NilResult.NULL;
		} else if (bodyFloat.isUndefined()) {
			return NilResult.UNDEFINED;
		} else {
			return NilResult.DEFINED;
		}
	}

}
