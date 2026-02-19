package dev.rsdlang.sample.server.service.handler.listbody;

import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListBodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.SimpleRecord.Data;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListRecordBodyParamHandlerImpl implements ListBodyParameterTypesServiceImpl.ListRecordBodyParamHandler {

	@Override
	public List<Data> listRecordBodyParam(BuilderFactory _factory, List<Data> bodyRecord) {
		return bodyRecord;
	}

}
