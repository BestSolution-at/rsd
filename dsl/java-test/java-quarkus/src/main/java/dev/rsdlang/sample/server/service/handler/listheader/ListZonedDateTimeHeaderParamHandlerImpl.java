package dev.rsdlang.sample.server.service.handler.listheader;

import java.time.ZonedDateTime;
import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListHeaderParameterTypesServiceImpl;

public class ListZonedDateTimeHeaderParamHandlerImpl
		implements ListHeaderParameterTypesServiceImpl.ListZonedDateTimeHeaderParamHandler {

	@Override
	public List<ZonedDateTime> listZonedDateTimeHeaderParam(BuilderFactory _factory, List<ZonedDateTime> headerValue) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'listZonedDateTimeHeaderParam'");
	}

}
