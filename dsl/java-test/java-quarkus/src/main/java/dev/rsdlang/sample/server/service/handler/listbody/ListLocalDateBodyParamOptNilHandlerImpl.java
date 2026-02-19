package dev.rsdlang.sample.server.service.handler.listbody;

import java.time.LocalDate;
import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListBodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import dev.rsdlang.sample.server.service.model._Base.Nillable;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListLocalDateBodyParamOptNilHandlerImpl
		implements ListBodyParameterTypesServiceImpl.ListLocalDateBodyParamOptNilHandler {

	@Override
	public NilResult listLocalDateBodyParamOptNil(BuilderFactory _factory, Nillable<List<LocalDate>> bodyLocalDate) {
		if (bodyLocalDate.isNull()) {
			return NilResult.NULL;
		} else if (bodyLocalDate.isUndefined()) {
			return NilResult.UNDEFINED;
		} else {
			return NilResult.DEFINED;
		}
	}

}
