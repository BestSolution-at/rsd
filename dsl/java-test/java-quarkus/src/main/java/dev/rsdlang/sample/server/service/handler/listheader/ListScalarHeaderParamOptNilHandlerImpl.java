package dev.rsdlang.sample.server.service.handler.listheader;

import java.time.ZoneId;
import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListHeaderParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import dev.rsdlang.sample.server.service.model._Base.Nillable;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListScalarHeaderParamOptNilHandlerImpl
		implements ListHeaderParameterTypesServiceImpl.ListScalarHeaderParamOptNilHandler {

	@Override
	public NilResult listScalarHeaderParamOptNil(BuilderFactory _factory, Nillable<List<ZoneId>> headerValue) {
		if (headerValue.isUndefined()) {
			return NilResult.UNDEFINED;
		} else if (headerValue.isNull()) {
			return NilResult.NULL;
		} else {
			return NilResult.DEFINED;
		}
	}

}
