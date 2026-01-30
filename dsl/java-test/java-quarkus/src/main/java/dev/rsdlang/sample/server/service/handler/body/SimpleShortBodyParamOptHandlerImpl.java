package dev.rsdlang.sample.server.service.handler.body;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleShortBodyParamOptHandlerImpl
		implements BodyParameterTypesServiceImpl.SimpleShortBodyParamOptHandler {

	@Override
	public NilResult simpleShortBodyParamOpt(BuilderFactory _factory, Short bodyShort) {
		return bodyShort == null ? NilResult.UNDEFINED : NilResult.DEFINED;
	}

}
