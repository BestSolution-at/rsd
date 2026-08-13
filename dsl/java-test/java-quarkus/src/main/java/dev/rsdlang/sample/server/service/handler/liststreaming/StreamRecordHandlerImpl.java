package dev.rsdlang.sample.server.service.handler.liststreaming;

import dev.rsdlang.sample.server.service.impl.ListStreamingServiceServiceImpl;

import java.util.concurrent.atomic.AtomicInteger;

import dev.rsdlang.sample.server.model.SimpleRecord;
import dev.rsdlang.sample.server.service.BuilderFactory;
import io.smallrye.mutiny.Multi;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class StreamRecordHandlerImpl implements ListStreamingServiceServiceImpl.StreamRecordHandler {

	@Override
	public Multi<SimpleRecord.Data> streamRecord(BuilderFactory _factory) {
		AtomicInteger counter = new AtomicInteger(0);
		return Multi.createBy().repeating()
				.supplier(() -> createRecord(_factory, counter.getAndIncrement()))
				.until(i -> i.key().equals("key-3"));
	}

	private SimpleRecord.Data createRecord(BuilderFactory _factory, int i) {
		return _factory.builder(SimpleRecord.DataBuilder.class)
				.key("key-" + i)
				.version("1")
				.value("Hello World for " + i + ". time!")
				.build();
	}
}
