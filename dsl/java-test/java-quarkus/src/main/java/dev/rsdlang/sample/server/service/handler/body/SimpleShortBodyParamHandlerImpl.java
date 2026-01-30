package dev.rsdlang.sample.server.service.handler.body;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BodyParameterTypesServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleShortBodyParamHandlerImpl implements BodyParameterTypesServiceImpl.SimpleShortBodyParamHandler {

	@Override
	public short simpleShortBodyParam(BuilderFactory _factory, short bodyShort) {
		return bodyShort;
	}

}
