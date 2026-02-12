package dev.rsdlang.sample.server.service.handler.listheader;

import java.time.ZoneId;
import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListHeaderParameterTypesServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListScalarHeaderParamHandlerImpl
		implements ListHeaderParameterTypesServiceImpl.ListScalarHeaderParamHandler {

	@Override
	public List<ZoneId> listScalarHeaderParam(BuilderFactory _factory, List<ZoneId> headerValue) {
		return headerValue;
	}

}
