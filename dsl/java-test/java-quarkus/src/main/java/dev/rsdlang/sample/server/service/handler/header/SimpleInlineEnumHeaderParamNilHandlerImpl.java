package dev.rsdlang.sample.server.service.handler.header;

import java.util.Optional;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.HeaderParameterTypesService.SimpleInlineEnumHeaderParamNil_HeaderValue_Param$;
import dev.rsdlang.sample.server.service.impl.HeaderParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleInlineEnumHeaderParamNilHandlerImpl
		implements HeaderParameterTypesServiceImpl.SimpleInlineEnumHeaderParamNilHandler {

	@Override
	public NilResult simpleInlineEnumHeaderParamNil(BuilderFactory _factory,
			Optional<SimpleInlineEnumHeaderParamNil_HeaderValue_Param$> headerValue) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'simpleInlineEnumHeaderParamNil'");
	}

}
