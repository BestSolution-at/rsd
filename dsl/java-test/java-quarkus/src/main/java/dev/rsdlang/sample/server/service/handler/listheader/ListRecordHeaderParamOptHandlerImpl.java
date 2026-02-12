package dev.rsdlang.sample.server.service.handler.listheader;

import java.util.List;
import java.util.Optional;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListHeaderParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import dev.rsdlang.sample.server.service.model.SimpleRecord.Data;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListRecordHeaderParamOptHandlerImpl
		implements ListHeaderParameterTypesServiceImpl.ListRecordHeaderParamOptHandler {

	@Override
	public NilResult listRecordHeaderParamOpt(BuilderFactory _factory, Optional<List<Data>> headerValue) {
		return headerValue.isPresent() ? NilResult.DEFINED : NilResult.UNDEFINED;
	}

}
