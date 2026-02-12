package dev.rsdlang.sample.server.service.handler.listheader;

import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListHeaderParameterTypesServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListIntHeaderParamHandlerImpl
		implements ListHeaderParameterTypesServiceImpl.ListIntHeaderParamHandler {

	@Override
	public List<Integer> listIntHeaderParam(BuilderFactory _factory, List<Integer> headerValue) {
		return headerValue;
	}

}
