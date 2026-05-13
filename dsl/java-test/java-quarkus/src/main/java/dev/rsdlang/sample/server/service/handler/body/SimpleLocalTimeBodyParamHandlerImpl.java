package dev.rsdlang.sample.server.service.handler.body;

import java.time.LocalTime;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BodyParameterTypesServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleLocalTimeBodyParamHandlerImpl
		implements BodyParameterTypesServiceImpl.SimpleLocalTimeBodyParamHandler {

	@Override
	public LocalTime simpleLocalTimeBodyParam(BuilderFactory _factory, LocalTime bodyLocalTime) {
		return bodyLocalTime;
	}

}
