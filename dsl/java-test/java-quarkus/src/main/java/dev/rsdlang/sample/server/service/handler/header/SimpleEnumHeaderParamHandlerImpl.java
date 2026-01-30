package dev.rsdlang.sample.server.service.handler.header;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.HeaderParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.SampleEnum;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleEnumHeaderParamHandlerImpl implements HeaderParameterTypesServiceImpl.SimpleEnumHeaderParamHandler {

	@Override
	public SampleEnum simpleEnumHeaderParam(BuilderFactory _factory, SampleEnum headerValue) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'simpleEnumHeaderParam'");
	}

}
