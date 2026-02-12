package dev.rsdlang.sample.server.service.handler.listheader;

import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListHeaderParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.SampleEnum;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListEnumHeaderParamHandlerImpl implements ListHeaderParameterTypesServiceImpl.ListEnumHeaderParamHandler {

	@Override
	public List<SampleEnum> listEnumHeaderParam(BuilderFactory _factory, List<SampleEnum> headerValue) {
		return headerValue;
	}

}
