package dev.rsdlang.sample.server.service.handler.listbody;

import java.time.OffsetDateTime;
import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListBodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import dev.rsdlang.sample.server.service.model._Base.Nillable;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListOffsetDateTimeBodyParamOptNilHandlerImpl
		implements ListBodyParameterTypesServiceImpl.ListOffsetDateTimeBodyParamOptNilHandler {

	@Override
	public NilResult listOffsetDateTimeBodyParamOptNil(BuilderFactory _factory, Nillable<List<OffsetDateTime>> bodyOffsetDateTime) {
		if (bodyOffsetDateTime.isNull()) {
			return NilResult.NULL;
		} else if (bodyOffsetDateTime.isUndefined()) {
			return NilResult.UNDEFINED;
		} else {
			return NilResult.DEFINED;
		}
	}

}