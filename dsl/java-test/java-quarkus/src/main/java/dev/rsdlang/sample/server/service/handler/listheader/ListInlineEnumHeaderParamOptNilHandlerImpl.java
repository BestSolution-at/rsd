package dev.rsdlang.sample.server.service.handler.listheader;

import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.ListHeaderParameterTypesService.ListInlineEnumHeaderParamOptNil_HeaderValue_Param$;
import dev.rsdlang.sample.server.service.impl.ListHeaderParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListInlineEnumHeaderParamOptNilHandlerImpl
		implements ListHeaderParameterTypesServiceImpl.ListInlineEnumHeaderParamOptNilHandler {

	@Override
	public NilResult listInlineEnumHeaderParamOptNil(BuilderFactory _factory,
			List<ListInlineEnumHeaderParamOptNil_HeaderValue_Param$> headerValue) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'listInlineEnumHeaderParamOptNil'");
	}

}
