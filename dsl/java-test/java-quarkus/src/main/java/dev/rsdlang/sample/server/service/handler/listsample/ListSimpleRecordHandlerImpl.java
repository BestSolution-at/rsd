package dev.rsdlang.sample.server.service.handler.listsample;

import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListSampleServiceServiceImpl;
import dev.rsdlang.sample.server.service.model.SimpleRecord.Data;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListSimpleRecordHandlerImpl implements ListSampleServiceServiceImpl.ListSimpleRecordHandler {

	@Override
	public List<Data> listSimpleRecord(BuilderFactory _factory) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'listSimpleRecord'");
	}

}
