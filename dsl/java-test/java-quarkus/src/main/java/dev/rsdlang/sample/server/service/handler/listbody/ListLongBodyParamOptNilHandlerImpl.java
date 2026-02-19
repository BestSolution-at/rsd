package dev.rsdlang.sample.server.service.handler.listbody;

import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListBodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import dev.rsdlang.sample.server.service.model._Base.Nillable;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListLongBodyParamOptNilHandlerImpl
		implements ListBodyParameterTypesServiceImpl.ListLongBodyParamOptNilHandler {

	@Override
	public NilResult listLongBodyParamOptNil(BuilderFactory _factory, Nillable<List<Long>> bodyLong) {
		if (bodyLong.isNull()) {
			return NilResult.NULL;
		} else if (bodyLong.isUndefined()) {
			return NilResult.UNDEFINED;
		} else {
			return NilResult.DEFINED;
		}
	}

}
