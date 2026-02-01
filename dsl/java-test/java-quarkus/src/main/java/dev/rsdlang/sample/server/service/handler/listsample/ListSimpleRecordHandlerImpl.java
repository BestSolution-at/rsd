package dev.rsdlang.sample.server.service.handler.listsample;

import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListSampleServiceServiceImpl;
import dev.rsdlang.sample.server.service.model.SimpleRecord;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListSimpleRecordHandlerImpl implements ListSampleServiceServiceImpl.ListSimpleRecordHandler {

	@Override
	public List<SimpleRecord.Data> listSimpleRecord(BuilderFactory _factory) {
		return List.of(
				_factory.builder(SimpleRecord.DataBuilder.class)
						.key("123")
						.version("1")
						.value("Sample Name").build());
	}

}
