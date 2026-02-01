package dev.rsdlang.sample.server.service.handler.listsample;

import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.SampleErrorException;
import dev.rsdlang.sample.server.service.impl.ListSampleServiceServiceImpl;
import dev.rsdlang.sample.server.service.model.SimpleRecord.Data;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListSimpleRecordWithErrorHandlerImpl
		implements ListSampleServiceServiceImpl.ListSimpleRecordWithErrorHandler {

	@Override
	public List<Data> listSimpleRecordWithError(BuilderFactory _factory) throws SampleErrorException {
		throw new SampleErrorException("My error");
	}

}
