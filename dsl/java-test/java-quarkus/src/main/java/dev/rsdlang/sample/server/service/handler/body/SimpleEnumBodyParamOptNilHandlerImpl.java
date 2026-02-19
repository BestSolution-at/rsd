package dev.rsdlang.sample.server.service.handler.body;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import dev.rsdlang.sample.server.service.model.SampleEnum;
import dev.rsdlang.sample.server.service.model._Base.Nillable;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleEnumBodyParamOptNilHandlerImpl
		implements BodyParameterTypesServiceImpl.SimpleEnumBodyParamOptNilHandler {

	@Override
	public NilResult simpleEnumBodyParamOptNil(BuilderFactory _factory, Nillable<SampleEnum> bodyEnum) {
		if (bodyEnum.isNull()) {
			return NilResult.NULL;
		} else if (bodyEnum.isUndefined()) {
			return NilResult.UNDEFINED;
		} else {
			return NilResult.DEFINED;
		}
	}

}
