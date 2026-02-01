package dev.rsdlang.sample.server.service.handler.body;

import java.util.Optional;

import dev.rsdlang.sample.server.service.BodyParameterTypesService.SimpleInlineEnumBodyParamOpt_BodyEnum_Param$;
import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleInlineEnumBodyParamOptHandlerImpl
		implements BodyParameterTypesServiceImpl.SimpleInlineEnumBodyParamOptHandler {

	@Override
	public NilResult simpleInlineEnumBodyParamOpt(BuilderFactory _factory,
			Optional<SimpleInlineEnumBodyParamOpt_BodyEnum_Param$> bodyEnum) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'simpleInlineEnumBodyParamOpt'");
	}

}
