package dev.rsdlang.sample.server.service.handler.listbody;

import java.time.ZonedDateTime;
import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListBodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListZonedDateTimeBodyParamOptHandlerImpl
		implements ListBodyParameterTypesServiceImpl.ListZonedDateTimeBodyParamOptHandler {

	@Override
	public NilResult listZonedDateTimeBodyParamOpt(BuilderFactory _factory, List<ZonedDateTime> bodyZonedDateTime) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'listZonedDateTimeBodyParamOpt'");
	}

}
