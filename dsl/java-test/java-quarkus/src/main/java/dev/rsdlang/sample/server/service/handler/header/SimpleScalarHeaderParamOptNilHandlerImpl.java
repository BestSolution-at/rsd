package dev.rsdlang.sample.server.service.handler.header;

import java.time.ZoneId;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.HeaderParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleScalarHeaderParamOptNilHandlerImpl
		implements HeaderParameterTypesServiceImpl.SimpleScalarHeaderParamOptNilHandler {

	@Override
	public NilResult simpleScalarHeaderParamOptNil(BuilderFactory _factory, ZoneId headerValue) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'simpleScalarHeaderParamOptNil'");
	}

}
