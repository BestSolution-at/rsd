package dev.rsdlang.sample.server.service.handler.body;

import java.time.LocalDate;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleLocalDateBodyParamOptNilHandlerImpl
		implements BodyParameterTypesServiceImpl.SimpleLocalDateBodyParamOptNilHandler {

	@Override
	public NilResult simpleLocalDateBodyParamOptNil(BuilderFactory _factory, LocalDate bodyLocalDate) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'simpleLocalDateBodyParamOptNil'");
	}

}
