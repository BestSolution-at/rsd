package dev.rsdlang.sample.server.service.handler.listheader;

import java.time.OffsetDateTime;
import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListHeaderParameterTypesServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListOffsetDateTimeHeaderParamHandlerImpl
		implements ListHeaderParameterTypesServiceImpl.ListOffsetDateTimeHeaderParamHandler {

	@Override
	public List<OffsetDateTime> listOffsetDateTimeHeaderParam(BuilderFactory _factory, List<OffsetDateTime> headerValue) {
		return headerValue;
	}

}