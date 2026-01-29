package dev.rsdlang.sample.server.service.handler.listheader;

import java.time.LocalDate;
import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListHeaderParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;

public class ListLocalDateHeaderParamOptHandlerImpl
		implements ListHeaderParameterTypesServiceImpl.ListLocalDateHeaderParamOptHandler {

	@Override
	public NilResult listLocalDateHeaderParamOpt(BuilderFactory _factory, List<LocalDate> headerValue) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'listLocalDateHeaderParamOpt'");
	}

}
