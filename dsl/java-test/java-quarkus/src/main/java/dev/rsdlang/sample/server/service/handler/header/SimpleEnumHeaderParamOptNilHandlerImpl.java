package dev.rsdlang.sample.server.service.handler.header;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.HeaderParameterTypesServiceImpl;
import dev.rsdlang.sample.server.model.NilResult;
import dev.rsdlang.sample.server.model.SampleEnum;
import dev.rsdlang.sample.server.model._Base.Nillable;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleEnumHeaderParamOptNilHandlerImpl
		implements HeaderParameterTypesServiceImpl.SimpleEnumHeaderParamOptNilHandler {

	@Override
	public NilResult simpleEnumHeaderParamOptNil(BuilderFactory _factory, Nillable<SampleEnum> headerValue) {
		if (headerValue.isUndefined()) {
			return NilResult.UNDEFINED;
		} else if (headerValue.isNull()) {
			return NilResult.NULL;
		} else {
			return NilResult.DEFINED;
		}
	}

}
