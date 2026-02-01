package dev.rsdlang.sample.server.service.handler.listquery;

import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListQueryParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.SimpleRecord;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListRecordQueryParamHandlerImpl implements ListQueryParameterTypesServiceImpl.ListRecordQueryParamHandler {

	@Override
	public List<SimpleRecord.Data> listRecordQueryParam(BuilderFactory _factory, List<SimpleRecord.Data> queryValue) {
		return queryValue;
	}

}
