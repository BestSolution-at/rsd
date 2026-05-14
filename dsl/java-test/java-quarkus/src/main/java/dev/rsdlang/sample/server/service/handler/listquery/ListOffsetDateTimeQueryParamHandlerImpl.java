package dev.rsdlang.sample.server.service.handler.listquery;

import java.time.OffsetDateTime;
import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListQueryParameterTypesServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListOffsetDateTimeQueryParamHandlerImpl
		implements ListQueryParameterTypesServiceImpl.ListOffsetDateTimeQueryParamHandler {

	@Override
	public List<OffsetDateTime> listOffsetDateTimeQueryParam(BuilderFactory _factory, List<OffsetDateTime> queryValue) {
		return queryValue;
	}

}