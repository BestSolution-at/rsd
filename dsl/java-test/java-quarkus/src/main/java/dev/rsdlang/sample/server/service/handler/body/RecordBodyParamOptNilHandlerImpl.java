package dev.rsdlang.sample.server.service.handler.body;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import dev.rsdlang.sample.server.service.model.SimpleRecord.Data;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class RecordBodyParamOptNilHandlerImpl implements BodyParameterTypesServiceImpl.RecordBodyParamOptNilHandler {

	@Override
	public NilResult recordBodyParamOptNil(BuilderFactory _factory, Data bodyRecord) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'recordBodyParamOptNil'");
	}

}
