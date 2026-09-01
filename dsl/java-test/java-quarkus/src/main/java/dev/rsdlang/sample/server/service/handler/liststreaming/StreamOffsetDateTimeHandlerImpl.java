package dev.rsdlang.sample.server.service.handler.liststreaming;

import dev.rsdlang.sample.server.service.impl.ListStreamingServiceServiceImpl;
import dev.rsdlang.sample.server.service.BuilderFactory;
import io.smallrye.mutiny.Multi;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class StreamOffsetDateTimeHandlerImpl implements ListStreamingServiceServiceImpl.StreamOffsetDateTimeHandler {

	@Override
	public Multi<java.time.OffsetDateTime> streamOffsetDateTime(BuilderFactory _factory) {
		return Multi.createFrom().items(
				java.time.OffsetDateTime.parse("2020-01-01T00:00:00+00:00"),
				java.time.OffsetDateTime.parse("1970-01-01T00:00:00+00:00"));
	}

}
