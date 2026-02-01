package dev.rsdlang.sample.server.service.handler.query;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.QueryParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.SimpleRecord;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class RecordQueryParamHandlerImpl implements QueryParameterTypesServiceImpl.RecordQueryParamHandler {

	@Override
	public SimpleRecord.Data recordQueryParam(BuilderFactory _factory, SimpleRecord.Data queryValue) {
		return queryValue;
	}

}
