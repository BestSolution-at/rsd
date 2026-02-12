package dev.rsdlang.sample.server.service.handler.listheader;

import java.util.List;
import java.util.Optional;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.ListHeaderParameterTypesService.ListInlineEnumHeaderParamNil_HeaderValue_Param$;
import dev.rsdlang.sample.server.service.impl.ListHeaderParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListInlineEnumHeaderParamNilHandlerImpl
		implements ListHeaderParameterTypesServiceImpl.ListInlineEnumHeaderParamNilHandler {

	@Override
	public NilResult listInlineEnumHeaderParamNil(BuilderFactory _factory,
			Optional<List<ListInlineEnumHeaderParamNil_HeaderValue_Param$>> headerValue) {
		return headerValue.isPresent() ? NilResult.DEFINED : NilResult.NULL;
	}

}
