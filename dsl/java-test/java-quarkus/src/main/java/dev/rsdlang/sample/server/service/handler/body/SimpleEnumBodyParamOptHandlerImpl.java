package dev.rsdlang.sample.server.service.handler.body;

import java.util.Optional;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import dev.rsdlang.sample.server.service.model.SampleEnum;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleEnumBodyParamOptHandlerImpl implements BodyParameterTypesServiceImpl.SimpleEnumBodyParamOptHandler {

	@Override
	public NilResult simpleEnumBodyParamOpt(BuilderFactory _factory, Optional<SampleEnum> bodyEnum) {
		return bodyEnum.isPresent() ? NilResult.DEFINED : NilResult.UNDEFINED;
	}

}
