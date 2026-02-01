package dev.rsdlang.sample.server.service.handler.header;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.HeaderParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.SimpleRecord;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class RecordHeaderParamHandlerImpl implements HeaderParameterTypesServiceImpl.RecordHeaderParamHandler {

	@Override
	public SimpleRecord.Data recordHeaderParam(BuilderFactory _factory, SimpleRecord.Data headerValue) {
		return headerValue;
	}

}
