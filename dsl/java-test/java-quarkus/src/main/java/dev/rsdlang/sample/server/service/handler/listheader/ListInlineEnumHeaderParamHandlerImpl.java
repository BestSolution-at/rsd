package dev.rsdlang.sample.server.service.handler.listheader;

import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.ListHeaderParameterTypesService.ListInlineEnumHeaderParam_HeaderValue_Param$;
import dev.rsdlang.sample.server.service.ListHeaderParameterTypesService.ListInlineEnumHeaderParam_Result$;
import dev.rsdlang.sample.server.service.impl.ListHeaderParameterTypesServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListInlineEnumHeaderParamHandlerImpl
		implements ListHeaderParameterTypesServiceImpl.ListInlineEnumHeaderParamHandler {

	@Override
	public List<ListInlineEnumHeaderParam_Result$> listInlineEnumHeaderParam(BuilderFactory _factory,
			List<ListInlineEnumHeaderParam_HeaderValue_Param$> headerValue) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'listInlineEnumHeaderParam'");
	}

}
