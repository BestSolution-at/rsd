package dev.rsdlang.sample.server.service.handler.listheader;

import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListHeaderParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import dev.rsdlang.sample.server.service.model.SimpleRecord.Data;
import dev.rsdlang.sample.server.service.model._Base.Nillable;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListRecordHeaderParamOptNilHandlerImpl
		implements ListHeaderParameterTypesServiceImpl.ListRecordHeaderParamOptNilHandler {

	@Override
	public NilResult listRecordHeaderParamOptNil(BuilderFactory _factory, Nillable<List<Data>> headerValue) {
		if (headerValue.isNull()) {
			return NilResult.NULL;
		} else if (headerValue.isUndefined()) {
			return NilResult.UNDEFINED;
		} else {
			return NilResult.DEFINED;
		}
	}

}
