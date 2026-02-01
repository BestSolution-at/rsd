package dev.rsdlang.sample.server.service.handler.listquery;

import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.ListQueryParameterTypesService.ListInlineEnumQueryParam_QueryValue_Param$;
import dev.rsdlang.sample.server.service.ListQueryParameterTypesService.ListInlineEnumQueryParam_Result$;
import dev.rsdlang.sample.server.service.impl.ListQueryParameterTypesServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListInlineEnumQueryParamHandlerImpl
		implements ListQueryParameterTypesServiceImpl.ListInlineEnumQueryParamHandler {

	@Override
	public List<ListInlineEnumQueryParam_Result$> listInlineEnumQueryParam(BuilderFactory _factory,
			List<ListInlineEnumQueryParam_QueryValue_Param$> queryValue) {
		return queryValue.stream()
				.map(v -> ListInlineEnumQueryParam_Result$.valueOf(v.name()))
				.toList();
	}

}
