package dev.rsdlang.sample.server.service.handler.body;

import java.time.OffsetDateTime;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BodyParameterTypesServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleOffsetDateTimeBodyParamHandlerImpl
		implements BodyParameterTypesServiceImpl.SimpleOffsetDateTimeBodyParamHandler {

	@Override
	public OffsetDateTime simpleOffsetDateTimeBodyParam(BuilderFactory _factory, OffsetDateTime bodyOffsetDateTime) {
		return bodyOffsetDateTime;
	}

}