package dev.rsdlang.sample.server.service.handler.path;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.PathParameterTypeServiceServiceImpl;
import dev.rsdlang.sample.server.service.model.SampleEnum;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleEnumPathParamHandlerImpl implements PathParameterTypeServiceServiceImpl.SimpleEnumPathParamHandler {

	@Override
	public SampleEnum simpleEnumPathParam(BuilderFactory _factory, SampleEnum pathEnum) {
		return pathEnum;
	}

}
