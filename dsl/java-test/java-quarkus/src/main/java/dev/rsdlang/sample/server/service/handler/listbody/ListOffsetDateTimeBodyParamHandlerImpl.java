package dev.rsdlang.sample.server.service.handler.listbody;

import java.time.OffsetDateTime;
import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListBodyParameterTypesServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListOffsetDateTimeBodyParamHandlerImpl
		implements ListBodyParameterTypesServiceImpl.ListOffsetDateTimeBodyParamHandler {

	@Override
	public List<OffsetDateTime> listOffsetDateTimeBodyParam(BuilderFactory _factory, List<OffsetDateTime> bodyOffsetDateTime) {
		return bodyOffsetDateTime;
	}

}