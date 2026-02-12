package dev.rsdlang.sample.server.service.handler.listheader;

import java.time.LocalDateTime;
import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListHeaderParameterTypesServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListLocalDateTimeHeaderParamHandlerImpl
		implements ListHeaderParameterTypesServiceImpl.ListLocalDateTimeHeaderParamHandler {

	@Override
	public List<LocalDateTime> listLocalDateTimeHeaderParam(BuilderFactory _factory, List<LocalDateTime> headerValue) {
		return headerValue;
	}

}
