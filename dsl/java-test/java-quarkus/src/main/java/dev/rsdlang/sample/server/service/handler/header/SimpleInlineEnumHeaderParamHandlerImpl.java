package dev.rsdlang.sample.server.service.handler.header;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.HeaderParameterTypesService.SimpleInlineEnumHeaderParam_HeaderValue_Param$;
import dev.rsdlang.sample.server.service.HeaderParameterTypesService.SimpleInlineEnumHeaderParam_Result$;
import dev.rsdlang.sample.server.service.impl.HeaderParameterTypesServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleInlineEnumHeaderParamHandlerImpl
		implements HeaderParameterTypesServiceImpl.SimpleInlineEnumHeaderParamHandler {

	@Override
	public SimpleInlineEnumHeaderParam_Result$ simpleInlineEnumHeaderParam(BuilderFactory arg0,
			SimpleInlineEnumHeaderParam_HeaderValue_Param$ arg1) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'simpleInlineEnumHeaderParam'");
	}

}
