package dev.rsdlang.sample.server.service.handler.header;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.HeaderParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import dev.rsdlang.sample.server.service.model.SimpleRecord.Data;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class RecordHeaderParamOptHandlerImpl implements HeaderParameterTypesServiceImpl.RecordHeaderParamOptHandler {

	@Override
	public NilResult recordHeaderParamOpt(BuilderFactory _factory, Data headerValue) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'recordHeaderParamOpt'");
	}

}
