package dev.rsdlang.sample.server.service.handler.body;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import dev.rsdlang.sample.server.service.model.SimpleRecord.Data;
import dev.rsdlang.sample.server.service.model._Base.Nillable;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class RecordBodyParamOptNilHandlerImpl implements BodyParameterTypesServiceImpl.RecordBodyParamOptNilHandler {

	@Override
	public NilResult recordBodyParamOptNil(BuilderFactory _factory, Nillable<Data> bodyRecord) {
		if (bodyRecord.isNull()) {
			return NilResult.NULL;
		} else if (bodyRecord.isUndefined()) {
			return NilResult.UNDEFINED;
		}
		return NilResult.DEFINED;
	}

}
