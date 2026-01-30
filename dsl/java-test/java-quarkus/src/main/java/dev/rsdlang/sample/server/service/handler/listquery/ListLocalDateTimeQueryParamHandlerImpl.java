package dev.rsdlang.sample.server.service.handler.listquery;

import java.time.LocalDateTime;
import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListQueryParameterTypesServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListLocalDateTimeQueryParamHandlerImpl
		implements ListQueryParameterTypesServiceImpl.ListLocalDateTimeQueryParamHandler {

	@Override
	public List<LocalDateTime> listLocalDateTimeQueryParam(BuilderFactory _factory, List<LocalDateTime> queryValue) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'listLocalDateTimeQueryParam'");
	}

}
