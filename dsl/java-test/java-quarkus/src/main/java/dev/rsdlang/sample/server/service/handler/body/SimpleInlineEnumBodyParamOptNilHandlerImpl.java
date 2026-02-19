package dev.rsdlang.sample.server.service.handler.body;

import dev.rsdlang.sample.server.service.BodyParameterTypesService.SimpleInlineEnumBodyParamOptNil_BodyEnum_Param$;
import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import dev.rsdlang.sample.server.service.model._Base.Nillable;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleInlineEnumBodyParamOptNilHandlerImpl
		implements BodyParameterTypesServiceImpl.SimpleInlineEnumBodyParamOptNilHandler {

	@Override
	public NilResult simpleInlineEnumBodyParamOptNil(BuilderFactory _factory,
			Nillable<SimpleInlineEnumBodyParamOptNil_BodyEnum_Param$> bodyEnum) {
		if (bodyEnum.isNull()) {
			return NilResult.NULL;
		} else if (bodyEnum.isUndefined()) {
			return NilResult.UNDEFINED;
		} else {
			return NilResult.DEFINED;
		}
	}

}
