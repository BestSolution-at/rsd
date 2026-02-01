package dev.rsdlang.sample.server.service.handler.header;

import java.util.Optional;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.HeaderParameterTypesService.SimpleInlineEnumHeaderParamOpt_HeaderValue_Param$;
import dev.rsdlang.sample.server.service.impl.HeaderParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleInlineEnumHeaderParamOptHandlerImpl
		implements HeaderParameterTypesServiceImpl.SimpleInlineEnumHeaderParamOptHandler {

	@Override
	public NilResult simpleInlineEnumHeaderParamOpt(BuilderFactory _factory,
			Optional<SimpleInlineEnumHeaderParamOpt_HeaderValue_Param$> headerValue) {
		return headerValue.isPresent() ? NilResult.DEFINED : NilResult.UNDEFINED;
	}

}
