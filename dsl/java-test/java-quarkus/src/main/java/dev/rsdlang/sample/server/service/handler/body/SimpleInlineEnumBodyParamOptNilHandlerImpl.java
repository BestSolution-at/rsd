package dev.rsdlang.sample.server.service.handler.body;

import dev.rsdlang.sample.server.service.BodyParameterTypesService.SimpleInlineEnumBodyParamOptNil_BodyEnum_Param$;
import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleInlineEnumBodyParamOptNilHandlerImpl
		implements BodyParameterTypesServiceImpl.SimpleInlineEnumBodyParamOptNilHandler {

	@Override
	public NilResult simpleInlineEnumBodyParamOptNil(BuilderFactory arg0,
			SimpleInlineEnumBodyParamOptNil_BodyEnum_Param$ arg1) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'simpleInlineEnumBodyParamOptNil'");
	}

}
