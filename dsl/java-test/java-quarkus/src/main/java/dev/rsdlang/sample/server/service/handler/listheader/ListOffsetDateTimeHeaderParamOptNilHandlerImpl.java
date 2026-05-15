package dev.rsdlang.sample.server.service.handler.listheader;

import java.time.OffsetDateTime;
import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListHeaderParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import dev.rsdlang.sample.server.service.model._Base.Nillable;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListOffsetDateTimeHeaderParamOptNilHandlerImpl
		implements ListHeaderParameterTypesServiceImpl.ListOffsetDateTimeHeaderParamOptNilHandler {

	@Override
	public NilResult listOffsetDateTimeHeaderParamOptNil(BuilderFactory _factory, Nillable<List<OffsetDateTime>> headerValue) {
		if (headerValue.isNull()) {
			return NilResult.NULL;
		} else if (headerValue.isUndefined()) {
			return NilResult.UNDEFINED;
		} else {
			return NilResult.DEFINED;
		}
	}

}