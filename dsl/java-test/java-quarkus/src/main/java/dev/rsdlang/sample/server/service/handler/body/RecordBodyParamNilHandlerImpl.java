package dev.rsdlang.sample.server.service.handler.body;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import dev.rsdlang.sample.server.service.model.SimpleRecord.Data;

public class RecordBodyParamNilHandlerImpl implements BodyParameterTypesServiceImpl.RecordBodyParamNilHandler {

	@Override
	public NilResult recordBodyParamNil(BuilderFactory _factory, Data bodyRecord) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'recordBodyParamNil'");
	}

}
