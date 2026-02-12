package dev.rsdlang.sample.server.service.handler.listheader;

import java.time.ZonedDateTime;
import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListHeaderParameterTypesServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListZonedDateTimeHeaderParamHandlerImpl
		implements ListHeaderParameterTypesServiceImpl.ListZonedDateTimeHeaderParamHandler {

	@Override
	public List<ZonedDateTime> listZonedDateTimeHeaderParam(BuilderFactory _factory, List<ZonedDateTime> headerValue) {
		return headerValue;
	}

}
