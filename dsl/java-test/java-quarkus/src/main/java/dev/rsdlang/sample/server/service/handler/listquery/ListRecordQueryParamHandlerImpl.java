package dev.rsdlang.sample.server.service.handler.listquery;

import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListQueryParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.SimpleRecord.Data;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListRecordQueryParamHandlerImpl implements ListQueryParameterTypesServiceImpl.ListRecordQueryParamHandler {

	@Override
	public List<Data> listRecordQueryParam(BuilderFactory _factory, List<Data> queryValue) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'listRecordQueryParam'");
	}

}
