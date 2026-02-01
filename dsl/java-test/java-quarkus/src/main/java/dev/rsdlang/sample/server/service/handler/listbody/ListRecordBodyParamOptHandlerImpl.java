package dev.rsdlang.sample.server.service.handler.listbody;

import java.util.List;
import java.util.Optional;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListBodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import dev.rsdlang.sample.server.service.model.SimpleRecord.Data;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListRecordBodyParamOptHandlerImpl
		implements ListBodyParameterTypesServiceImpl.ListRecordBodyParamOptHandler {

	@Override
	public NilResult listRecordBodyParamOpt(BuilderFactory _factory, Optional<List<Data>> bodyRecord) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'listRecordBodyParamOpt'");
	}

}
