package dev.rsdlang.sample.server.service.handler.listbody;

import java.time.ZonedDateTime;
import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListBodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import dev.rsdlang.sample.server.service.model._Base.Nillable;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListZonedDateTimeBodyParamOptNilHandlerImpl
		implements ListBodyParameterTypesServiceImpl.ListZonedDateTimeBodyParamOptNilHandler {

	@Override
	public NilResult listZonedDateTimeBodyParamOptNil(BuilderFactory _factory,
			Nillable<List<ZonedDateTime>> bodyZonedDateTime) {
		if (bodyZonedDateTime.isNull()) {
			return NilResult.NULL;
		} else if (bodyZonedDateTime.isUndefined()) {
			return NilResult.UNDEFINED;
		} else {
			return NilResult.DEFINED;
		}
	}

}
