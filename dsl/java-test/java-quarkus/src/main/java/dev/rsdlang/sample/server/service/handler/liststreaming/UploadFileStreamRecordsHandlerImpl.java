package dev.rsdlang.sample.server.service.handler.liststreaming;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

import dev.rsdlang.sample.server.model.RSDFile;
import dev.rsdlang.sample.server.model.SimpleRecord;
import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListStreamingServiceServiceImpl;
import io.smallrye.mutiny.Multi;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class UploadFileStreamRecordsHandlerImpl implements ListStreamingServiceServiceImpl.UploadFileStreamRecordsHandler {

	@Override
	public Multi<SimpleRecord.Data> uploadFileStreamRecords(BuilderFactory _factory, RSDFile data) {
		List<String> lines = readLines(data);
		AtomicInteger counter = new AtomicInteger(0);
		return Multi.createFrom().iterable(lines).map(line -> _factory.builder(SimpleRecord.DataBuilder.class)
				.key("line-" + counter.getAndIncrement())
				.version("1")
				.value(line)
				.build());
	}

	private static List<String> readLines(RSDFile data) {
		List<String> lines = new ArrayList<>();
		try (var reader = new BufferedReader(new InputStreamReader(data.stream(), StandardCharsets.UTF_8))) {
			String line;
			while ((line = reader.readLine()) != null) {
				lines.add(line);
			}
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
		return lines;
	}
}
