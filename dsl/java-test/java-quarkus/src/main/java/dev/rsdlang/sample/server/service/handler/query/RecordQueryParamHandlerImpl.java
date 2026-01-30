package dev.rsdlang.sample.server.service.handler.query;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.QueryParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.SimpleRecord.Data;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class RecordQueryParamHandlerImpl implements QueryParameterTypesServiceImpl.RecordQueryParamHandler {

	@Override
	public Data recordQueryParam(BuilderFactory _factory, Data queryValue) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'recordQueryParam'");
	}

}
