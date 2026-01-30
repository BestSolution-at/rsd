package dev.rsdlang.sample.server.service.handler.body;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BodyParameterTypesServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleBooleanBodyParamHandlerImpl implements BodyParameterTypesServiceImpl.SimpleBooleanBodyParamHandler {

	@Override
	public boolean simpleBooleanBodyParam(BuilderFactory _factory, boolean bodyBoolean) {
		return bodyBoolean;
	}

}
