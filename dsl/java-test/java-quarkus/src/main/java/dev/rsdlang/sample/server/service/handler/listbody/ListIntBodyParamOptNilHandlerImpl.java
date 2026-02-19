package dev.rsdlang.sample.server.service.handler.listbody;

import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListBodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import dev.rsdlang.sample.server.service.model._Base.Nillable;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListIntBodyParamOptNilHandlerImpl
		implements ListBodyParameterTypesServiceImpl.ListIntBodyParamOptNilHandler {

	@Override
	public NilResult listIntBodyParamOptNil(BuilderFactory _factory, Nillable<List<Integer>> bodyInt) {
		if (bodyInt.isNull()) {
			return NilResult.NULL;
		} else if (bodyInt.isUndefined()) {
			return NilResult.UNDEFINED;
		} else {
			return NilResult.DEFINED;
		}
	}

}
