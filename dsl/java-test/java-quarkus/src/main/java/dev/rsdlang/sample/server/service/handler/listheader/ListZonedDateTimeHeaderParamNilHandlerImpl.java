package dev.rsdlang.sample.server.service.handler.listheader;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListHeaderParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListZonedDateTimeHeaderParamNilHandlerImpl
		implements ListHeaderParameterTypesServiceImpl.ListZonedDateTimeHeaderParamNilHandler {

	@Override
	public NilResult listZonedDateTimeHeaderParamNil(BuilderFactory _factory, Optional<List<ZonedDateTime>> headerValue) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'listZonedDateTimeHeaderParamNil'");
	}

}
