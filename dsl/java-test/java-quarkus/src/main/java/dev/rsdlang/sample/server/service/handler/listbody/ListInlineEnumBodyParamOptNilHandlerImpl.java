package dev.rsdlang.sample.server.service.handler.listbody;

import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.ListBodyParameterTypesService.ListInlineEnumBodyParamOptNil_BodyEnum_Param$;
import dev.rsdlang.sample.server.service.impl.ListBodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListInlineEnumBodyParamOptNilHandlerImpl
		implements ListBodyParameterTypesServiceImpl.ListInlineEnumBodyParamOptNilHandler {

	@Override
	public NilResult listInlineEnumBodyParamOptNil(BuilderFactory _factory,
			List<ListInlineEnumBodyParamOptNil_BodyEnum_Param$> bodyEnum) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'listInlineEnumBodyParamOptNil'");
	}

}
