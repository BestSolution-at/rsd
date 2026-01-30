package dev.rsdlang.sample.server.service.handler.listbody;

import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListBodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import dev.rsdlang.sample.server.service.model.SimpleRecord.Data;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListRecordBodyParamNilHandlerImpl
		implements ListBodyParameterTypesServiceImpl.ListRecordBodyParamNilHandler {

	@Override
	public NilResult listRecordBodyParamNil(BuilderFactory _factory, List<Data> bodyRecord) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'listRecordBodyParamNil'");
	}

}
