package dev.rsdlang.sample.server.service.handler.listquery;

import java.time.ZoneId;
import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListQueryParameterTypesServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListScalarQueryParamHandlerImpl implements ListQueryParameterTypesServiceImpl.ListScalarQueryParamHandler {

	@Override
	public List<ZoneId> listScalarQueryParam(BuilderFactory _factory, List<ZoneId> queryValue) {
		return queryValue;
	}

}
