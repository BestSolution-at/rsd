package dev.rsdlang.sample.server.service.handler.listbody;

import java.time.LocalTime;
import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListBodyParameterTypesServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListLocalTimeBodyParamHandlerImpl
		implements ListBodyParameterTypesServiceImpl.ListLocalTimeBodyParamHandler {

	@Override
	public List<LocalTime> listLocalTimeBodyParam(BuilderFactory _factory, List<LocalTime> bodyLocalTime) {
		return bodyLocalTime;
	}

}
