package dev.rsdlang.sample.server.service.handler.header;

import java.util.OptionalLong;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.HeaderParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleLongHeaderParamNilHandlerImpl
		implements HeaderParameterTypesServiceImpl.SimpleLongHeaderParamNilHandler {

	@Override
	public NilResult simpleLongHeaderParamNil(BuilderFactory _factory, OptionalLong headerValue) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'simpleLongHeaderParamNil'");
	}

}
