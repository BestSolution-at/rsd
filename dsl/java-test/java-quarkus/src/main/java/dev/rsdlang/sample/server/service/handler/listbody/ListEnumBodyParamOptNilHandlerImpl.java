package dev.rsdlang.sample.server.service.handler.listbody;

import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListBodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.model.NilResult;
import dev.rsdlang.sample.server.model.SampleEnum;
import dev.rsdlang.sample.server.model._Base.Nillable;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListEnumBodyParamOptNilHandlerImpl
		implements ListBodyParameterTypesServiceImpl.ListEnumBodyParamOptNilHandler {

	@Override
	public NilResult listEnumBodyParamOptNil(BuilderFactory _factory, Nillable<List<SampleEnum>> bodyEnum) {
		if (bodyEnum.isNull()) {
			return NilResult.NULL;
		} else if (bodyEnum.isUndefined()) {
			return NilResult.UNDEFINED;
		} else {
			return NilResult.DEFINED;
		}
	}

}
