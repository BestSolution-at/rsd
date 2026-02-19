package dev.rsdlang.sample.server.service.handler.listbody;

import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListBodyParameterTypesServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListShortBodyParamHandlerImpl implements ListBodyParameterTypesServiceImpl.ListShortBodyParamHandler {

	@Override
	public List<Short> listShortBodyParam(BuilderFactory _factory, List<Short> bodyShort) {
		return bodyShort;
	}

}
