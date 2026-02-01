package dev.rsdlang.sample.server.service.handler.body;

import java.time.ZonedDateTime;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import dev.rsdlang.sample.server.service.model._Base.Nillable;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleZonedDateTimeBodyParamOptNilHandlerImpl
		implements BodyParameterTypesServiceImpl.SimpleZonedDateTimeBodyParamOptNilHandler {

	@Override
	public NilResult simpleZonedDateTimeBodyParamOptNil(BuilderFactory _factory,
			Nillable<ZonedDateTime> bodyZonedDateTime) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'simpleZonedDateTimeBodyParamOptNil'");
	}

}
