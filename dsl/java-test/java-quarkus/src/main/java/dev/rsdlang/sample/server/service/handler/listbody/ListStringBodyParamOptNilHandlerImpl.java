package dev.rsdlang.sample.server.service.handler.listbody;

import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListBodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import dev.rsdlang.sample.server.service.model._Base.Nillable;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListStringBodyParamOptNilHandlerImpl
		implements ListBodyParameterTypesServiceImpl.ListStringBodyParamOptNilHandler {

	@Override
	public NilResult listStringBodyParamOptNil(BuilderFactory _factory, Nillable<List<String>> bodyString) {
		if (bodyString.isNull()) {
			return NilResult.NULL;
		} else if (bodyString.isUndefined()) {
			return NilResult.UNDEFINED;
		} else {
			return NilResult.DEFINED;
		}
	}

}
