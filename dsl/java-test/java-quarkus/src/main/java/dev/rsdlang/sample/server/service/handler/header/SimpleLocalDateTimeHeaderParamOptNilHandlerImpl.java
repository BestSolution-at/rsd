package dev.rsdlang.sample.server.service.handler.header;

import java.time.LocalDateTime;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.HeaderParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import dev.rsdlang.sample.server.service.model._Base.Nillable;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleLocalDateTimeHeaderParamOptNilHandlerImpl
		implements HeaderParameterTypesServiceImpl.SimpleLocalDateTimeHeaderParamOptNilHandler {

	@Override
	public NilResult simpleLocalDateTimeHeaderParamOptNil(BuilderFactory _factory, Nillable<LocalDateTime> headerValue) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'simpleLocalDateTimeHeaderParamOptNil'");
	}

}
