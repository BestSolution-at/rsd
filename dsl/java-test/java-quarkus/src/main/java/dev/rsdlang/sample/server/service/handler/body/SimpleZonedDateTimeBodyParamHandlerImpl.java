package dev.rsdlang.sample.server.service.handler.body;

import java.time.ZonedDateTime;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BodyParameterTypesServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleZonedDateTimeBodyParamHandlerImpl
		implements BodyParameterTypesServiceImpl.SimpleZonedDateTimeBodyParamHandler {

	@Override
	public ZonedDateTime simpleZonedDateTimeBodyParam(BuilderFactory _factory, ZonedDateTime bodyZonedDateTime) {
		return bodyZonedDateTime;
	}

}
