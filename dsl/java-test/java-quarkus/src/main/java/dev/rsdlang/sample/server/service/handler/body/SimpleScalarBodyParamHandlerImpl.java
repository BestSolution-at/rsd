package dev.rsdlang.sample.server.service.handler.body;

import java.time.ZoneId;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BodyParameterTypesServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleScalarBodyParamHandlerImpl implements BodyParameterTypesServiceImpl.SimpleScalarBodyParamHandler {

	@Override
	public ZoneId simpleScalarBodyParam(BuilderFactory _factory, ZoneId bodyScalar) {
		return bodyScalar;
	}

}
