package dev.rsdlang.sample.server.service.handler.binary;

import jakarta.enterprise.context.ApplicationScoped;
import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BinaryTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.RSDBlob;
import dev.rsdlang.sample.server.service.model.SimpleRecord.Data;

@ApplicationScoped
public class MixedHandlerImpl implements BinaryTypesServiceImpl.MixedHandler {

	@Override
	public void mixed(BuilderFactory _factory, String pathString, int pathNumber, String headerString, int headerNumber,
			Data headerRecord, String queryString, int queryNumber, Data queryRecord, RSDBlob dataBlob) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'mixed'");
	}

}
