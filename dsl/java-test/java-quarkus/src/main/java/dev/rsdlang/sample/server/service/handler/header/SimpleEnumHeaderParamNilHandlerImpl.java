package dev.rsdlang.sample.server.service.handler.header;

import java.util.Optional;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.HeaderParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import dev.rsdlang.sample.server.service.model.SampleEnum;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleEnumHeaderParamNilHandlerImpl
		implements HeaderParameterTypesServiceImpl.SimpleEnumHeaderParamNilHandler {

	@Override
	public NilResult simpleEnumHeaderParamNil(BuilderFactory _factory, Optional<SampleEnum> headerValue) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'simpleEnumHeaderParamNil'");
	}

}
