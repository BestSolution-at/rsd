package dev.rsdlang.sample.server.service.handler.body;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BodyParameterTypesServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleStringBodyParamHandlerImpl implements BodyParameterTypesServiceImpl.SimpleStringBodyParamHandler {

	@Override
	public String simpleStringBodyParam(BuilderFactory _factory, String bodyString) {
		return bodyString;
	}

}
