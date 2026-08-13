package dev.rsdlang.sample.server.service.handler.liststreaming;

import dev.rsdlang.sample.server.service.impl.ListStreamingServiceServiceImpl;
import dev.rsdlang.sample.server.service.BuilderFactory;
import io.smallrye.mutiny.Multi;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class StreamZonedDateTimeHandlerImpl
		implements ListStreamingServiceServiceImpl.StreamZonedDateTimeHandler {

	@Override
	public Multi<java.time.ZonedDateTime> streamZonedDateTime(BuilderFactory _factory) {
		return Multi.createFrom().items(
				java.time.ZonedDateTime.parse("2020-01-01T00:00:00+01:00[Europe/Vienna]"),
				java.time.ZonedDateTime.parse("1970-01-01T00:00:00+01:00[Europe/Vienna]"));
	}

}
