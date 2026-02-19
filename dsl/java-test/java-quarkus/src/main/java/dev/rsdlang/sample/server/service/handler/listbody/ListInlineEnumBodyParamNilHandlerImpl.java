package dev.rsdlang.sample.server.service.handler.listbody;

import java.util.List;
import java.util.Optional;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.ListBodyParameterTypesService.ListInlineEnumBodyParamNil_BodyEnum_Param$;
import dev.rsdlang.sample.server.service.impl.ListBodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListInlineEnumBodyParamNilHandlerImpl
		implements ListBodyParameterTypesServiceImpl.ListInlineEnumBodyParamNilHandler {

	@Override
	public NilResult listInlineEnumBodyParamNil(BuilderFactory _factory,
			Optional<List<ListInlineEnumBodyParamNil_BodyEnum_Param$>> bodyEnum) {
		return bodyEnum.isPresent() ? NilResult.DEFINED : NilResult.NULL;
	}

}
