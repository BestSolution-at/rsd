package dev.rsdlang.sample.server.service.handler.listbody;

import java.time.ZonedDateTime;
import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListBodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;

public class ListZonedDateTimeBodyParamOptNilHandlerImpl
		implements ListBodyParameterTypesServiceImpl.ListZonedDateTimeBodyParamOptNilHandler {

	@Override
	public NilResult listZonedDateTimeBodyParamOptNil(BuilderFactory _factory, List<ZonedDateTime> bodyZonedDateTime) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'listZonedDateTimeBodyParamOptNil'");
	}

}
