package dev.rsdlang.sample.server.service.handler.sample;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.SampleErrorException;
import dev.rsdlang.sample.server.service.impl.SampleServiceServiceImpl;
import dev.rsdlang.sample.server.service.model.SimpleRecord.Data;

public class GetSimpleRecordWithErrorHandlerImpl implements SampleServiceServiceImpl.GetSimpleRecordWithErrorHandler {

	@Override
	public Data getSimpleRecordWithError(BuilderFactory _factory, String key) throws SampleErrorException {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'getSimpleRecordWithError'");
	}

}
