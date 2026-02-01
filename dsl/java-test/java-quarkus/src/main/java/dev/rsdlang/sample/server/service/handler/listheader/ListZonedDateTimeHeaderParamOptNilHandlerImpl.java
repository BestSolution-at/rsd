package dev.rsdlang.sample.server.service.handler.listheader;

import java.time.ZonedDateTime;
import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListHeaderParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import dev.rsdlang.sample.server.service.model._Base.Nillable;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListZonedDateTimeHeaderParamOptNilHandlerImpl
		implements ListHeaderParameterTypesServiceImpl.ListZonedDateTimeHeaderParamOptNilHandler {

	@Override
	public NilResult listZonedDateTimeHeaderParamOptNil(BuilderFactory _factory,
			Nillable<List<ZonedDateTime>> headerValue) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'listZonedDateTimeHeaderParamOptNil'");
	}

}
