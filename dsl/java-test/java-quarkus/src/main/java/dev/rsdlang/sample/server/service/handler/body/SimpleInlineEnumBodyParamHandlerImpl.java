package dev.rsdlang.sample.server.service.handler.body;

import dev.rsdlang.sample.server.service.BodyParameterTypesService.SimpleInlineEnumBodyParam_BodyEnum_Param$;
import dev.rsdlang.sample.server.service.BodyParameterTypesService.SimpleInlineEnumBodyParam_Result$;
import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BodyParameterTypesServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleInlineEnumBodyParamHandlerImpl
		implements BodyParameterTypesServiceImpl.SimpleInlineEnumBodyParamHandler {

	@Override
	public SimpleInlineEnumBodyParam_Result$ simpleInlineEnumBodyParam(BuilderFactory arg0,
			SimpleInlineEnumBodyParam_BodyEnum_Param$ arg1) {
		return SimpleInlineEnumBodyParam_Result$.valueOf(arg1.name());
	}

}
