package dev.rsdlang.sample.server.service.handler.sample;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.SampleServiceServiceImpl;
import dev.rsdlang.sample.server.service.model.SimpleRecord;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class GetSimpleRecordHandlerImpl implements SampleServiceServiceImpl.GetSimpleRecordHandler {

	@Override
	public SimpleRecord.Data getSimpleRecord(BuilderFactory _factory, String key) {
		return _factory.builder(SimpleRecord.DataBuilder.class)
				.key(key)
				.version("1")
				.value("Sample Name")
				.build();
	}

}
