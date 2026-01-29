package dev.rsdlang.sample.server.service.handler.listbody;

import java.time.LocalDateTime;
import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListBodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;

public class ListLocalDateTimeBodyParamOptNilHandlerImpl
		implements ListBodyParameterTypesServiceImpl.ListLocalDateTimeBodyParamOptNilHandler {

	@Override
	public NilResult listLocalDateTimeBodyParamOptNil(BuilderFactory _factory, List<LocalDateTime> bodyLocalDateTime) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'listLocalDateTimeBodyParamOptNil'");
	}

}
