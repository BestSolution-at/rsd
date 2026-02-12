package dev.rsdlang.sample.server.service.handler.listheader;

import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListHeaderParameterTypesServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListShortHeaderParamHandlerImpl
		implements ListHeaderParameterTypesServiceImpl.ListShortHeaderParamHandler {

	@Override
	public List<Short> listShortHeaderParam(BuilderFactory _factory, List<Short> headerValue) {
		return headerValue;
	}

}
