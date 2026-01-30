package dev.rsdlang.sample.server.service.handler.header;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.HeaderParameterTypesService.SimpleInlineEnumHeaderParamOptNil_HeaderValue_Param$;
import dev.rsdlang.sample.server.service.impl.HeaderParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleInlineEnumHeaderParamOptNilHandlerImpl
		implements HeaderParameterTypesServiceImpl.SimpleInlineEnumHeaderParamOptNilHandler {

	@Override
	public NilResult simpleInlineEnumHeaderParamOptNil(BuilderFactory arg0,
			SimpleInlineEnumHeaderParamOptNil_HeaderValue_Param$ arg1) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'simpleInlineEnumHeaderParamOptNil'");
	}

}
