package dev.rsdlang.sample.server.service.handler.listbody;

import java.util.List;
import java.util.Optional;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.ListBodyParameterTypesService.ListInlineEnumBodyParamOpt_BodyEnum_Param$;
import dev.rsdlang.sample.server.service.impl.ListBodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListInlineEnumBodyParamOptHandlerImpl
		implements ListBodyParameterTypesServiceImpl.ListInlineEnumBodyParamOptHandler {

	@Override
	public NilResult listInlineEnumBodyParamOpt(BuilderFactory _factory,
			Optional<List<ListInlineEnumBodyParamOpt_BodyEnum_Param$>> bodyEnum) {
		return bodyEnum.isPresent() ? NilResult.DEFINED : NilResult.UNDEFINED;
	}

}
