package dev.rsdlang.sample.server.service.handler.header;

import java.util.Optional;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.HeaderParameterTypesServiceImpl;
import dev.rsdlang.sample.server.model.NilResult;
import dev.rsdlang.sample.server.model.SampleEnum;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleEnumHeaderParamNilHandlerImpl
		implements HeaderParameterTypesServiceImpl.SimpleEnumHeaderParamNilHandler {

	@Override
	public NilResult simpleEnumHeaderParamNil(BuilderFactory _factory, Optional<SampleEnum> headerValue) {
		return headerValue.isPresent() ? NilResult.DEFINED : NilResult.NULL;
	}

}
