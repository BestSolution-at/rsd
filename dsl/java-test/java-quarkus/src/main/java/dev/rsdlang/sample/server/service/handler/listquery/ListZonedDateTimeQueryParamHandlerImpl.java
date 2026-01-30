package dev.rsdlang.sample.server.service.handler.listquery;

import java.time.ZonedDateTime;
import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListQueryParameterTypesServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListZonedDateTimeQueryParamHandlerImpl
		implements ListQueryParameterTypesServiceImpl.ListZonedDateTimeQueryParamHandler {

	@Override
	public List<ZonedDateTime> listZonedDateTimeQueryParam(BuilderFactory _factory, List<ZonedDateTime> queryValue) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'listZonedDateTimeQueryParam'");
	}

}
