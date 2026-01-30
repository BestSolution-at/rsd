package dev.rsdlang.sample.server.service.handler.sample;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.SampleErrorException;
import dev.rsdlang.sample.server.service.impl.SampleServiceServiceImpl;
import dev.rsdlang.sample.server.service.model.SimpleRecord.Data;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class GetSimpleRecordWithErrorHandlerImpl implements SampleServiceServiceImpl.GetSimpleRecordWithErrorHandler {

	@Override
	public Data getSimpleRecordWithError(BuilderFactory _factory, String key) throws SampleErrorException {
		throw new SampleErrorException("This is a sample error from the server");
	}

}
