package dev.rsdlang.sample.server.service.handler.listbody;

import java.time.LocalDateTime;
import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListBodyParameterTypesServiceImpl;

public class ListLocalDateTimeBodyParamHandlerImpl
		implements ListBodyParameterTypesServiceImpl.ListLocalDateTimeBodyParamHandler {

	@Override
	public List<LocalDateTime> listLocalDateTimeBodyParam(BuilderFactory _factory,
			List<LocalDateTime> bodyLocalDateTime) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'listLocalDateTimeBodyParam'");
	}

}
