package dev.rsdlang.sample.server.service.handler.header;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.HeaderParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.SimpleRecord.Data;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class MixHandlerImpl implements HeaderParameterTypesServiceImpl.MixedHandler {

	@Override
	public void mixed(BuilderFactory _factory, String pathString, int pathNumber, String headerString, int headerNumber,
			Data headerRecord, Data body, String queryString, double queryNumber, Data queryRecord) {

	}

}
