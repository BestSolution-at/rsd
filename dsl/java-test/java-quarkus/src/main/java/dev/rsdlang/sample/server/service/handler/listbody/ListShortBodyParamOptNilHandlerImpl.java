package dev.rsdlang.sample.server.service.handler.listbody;

import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListBodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import dev.rsdlang.sample.server.service.model._Base.Nillable;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListShortBodyParamOptNilHandlerImpl
		implements ListBodyParameterTypesServiceImpl.ListShortBodyParamOptNilHandler {

	@Override
	public NilResult listShortBodyParamOptNil(BuilderFactory _factory, Nillable<List<Short>> bodyShort) {
		if (bodyShort.isNull()) {
			return NilResult.NULL;
		} else if (bodyShort.isUndefined()) {
			return NilResult.UNDEFINED;
		} else {
			return NilResult.DEFINED;
		}
	}

}
