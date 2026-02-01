package dev.rsdlang.sample.server.service.handler.listheader;

import java.util.List;
import java.util.Optional;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.ListHeaderParameterTypesService.ListInlineEnumHeaderParamOpt_HeaderValue_Param$;
import dev.rsdlang.sample.server.service.impl.ListHeaderParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListInlineEnumHeaderParamOptHandlerImpl
		implements ListHeaderParameterTypesServiceImpl.ListInlineEnumHeaderParamOptHandler {

	@Override
	public NilResult listInlineEnumHeaderParamOpt(BuilderFactory _factory,
			Optional<List<ListInlineEnumHeaderParamOpt_HeaderValue_Param$>> headerValue) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'listInlineEnumHeaderParamOpt'");
	}

}
