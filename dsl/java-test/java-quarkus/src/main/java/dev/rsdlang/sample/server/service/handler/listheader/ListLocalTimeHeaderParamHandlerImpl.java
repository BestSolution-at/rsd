package dev.rsdlang.sample.server.service.handler.listheader;

import java.time.LocalTime;
import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListHeaderParameterTypesServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListLocalTimeHeaderParamHandlerImpl
		implements ListHeaderParameterTypesServiceImpl.ListLocalTimeHeaderParamHandler {

	@Override
	public List<LocalTime> listLocalTimeHeaderParam(BuilderFactory _factory, List<LocalTime> headerValue) {
		return headerValue;
	}

}
