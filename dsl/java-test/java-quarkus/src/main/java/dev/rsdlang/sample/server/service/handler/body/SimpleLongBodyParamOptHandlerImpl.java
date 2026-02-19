package dev.rsdlang.sample.server.service.handler.body;

import java.util.OptionalLong;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleLongBodyParamOptHandlerImpl implements BodyParameterTypesServiceImpl.SimpleLongBodyParamOptHandler {

	@Override
	public NilResult simpleLongBodyParamOpt(BuilderFactory _factory, OptionalLong bodyLong) {
		return bodyLong.isPresent() ? NilResult.DEFINED : NilResult.UNDEFINED;
	}

}
