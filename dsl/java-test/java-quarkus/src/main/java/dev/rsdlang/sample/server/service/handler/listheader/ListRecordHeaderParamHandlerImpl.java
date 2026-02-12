package dev.rsdlang.sample.server.service.handler.listheader;

import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListHeaderParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.SimpleRecord.Data;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListRecordHeaderParamHandlerImpl
		implements ListHeaderParameterTypesServiceImpl.ListRecordHeaderParamHandler {

	@Override
	public List<Data> listRecordHeaderParam(BuilderFactory _factory, List<Data> headerValue) {
		return headerValue;
	}

}
