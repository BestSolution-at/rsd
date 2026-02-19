package dev.rsdlang.sample.server.service.handler.listbody;

import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListBodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import dev.rsdlang.sample.server.service.model.SimpleRecord.Data;
import dev.rsdlang.sample.server.service.model._Base.Nillable;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListRecordBodyParamOptNilHandlerImpl
		implements ListBodyParameterTypesServiceImpl.ListRecordBodyParamOptNilHandler {

	@Override
	public NilResult listRecordBodyParamOptNil(BuilderFactory _factory, Nillable<List<Data>> bodyRecord) {
		if (bodyRecord.isNull()) {
			return NilResult.NULL;
		} else if (bodyRecord.isUndefined()) {
			return NilResult.UNDEFINED;
		} else {
			return NilResult.DEFINED;
		}
	}

}
