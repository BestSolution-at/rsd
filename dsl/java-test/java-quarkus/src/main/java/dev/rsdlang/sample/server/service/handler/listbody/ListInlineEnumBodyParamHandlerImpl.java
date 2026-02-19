package dev.rsdlang.sample.server.service.handler.listbody;

import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.ListBodyParameterTypesService.ListInlineEnumBodyParam_BodyEnum_Param$;
import dev.rsdlang.sample.server.service.ListBodyParameterTypesService.ListInlineEnumBodyParam_Result$;
import dev.rsdlang.sample.server.service.impl.ListBodyParameterTypesServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListInlineEnumBodyParamHandlerImpl
		implements ListBodyParameterTypesServiceImpl.ListInlineEnumBodyParamHandler {

	@Override
	public List<ListInlineEnumBodyParam_Result$> listInlineEnumBodyParam(BuilderFactory _factory,
			List<ListInlineEnumBodyParam_BodyEnum_Param$> bodyEnum) {
		return bodyEnum.stream()
				.map(param -> ListInlineEnumBodyParam_Result$.valueOf(param.name()))
				.toList();
	}

}
