package dev.rsdlang.sample.server.service.handler.listheader;

import java.time.LocalDateTime;
import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListHeaderParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;

public class ListLocalDateTimeHeaderParamNilHandlerImpl
		implements ListHeaderParameterTypesServiceImpl.ListLocalDateTimeHeaderParamNilHandler {

	@Override
	public NilResult listLocalDateTimeHeaderParamNil(BuilderFactory _factory, List<LocalDateTime> headerValue) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'listLocalDateTimeHeaderParamNil'");
	}

}
