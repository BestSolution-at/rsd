package dev.rsdlang.sample.server.service.handler.liststreaming;

import dev.rsdlang.sample.server.service.impl.ListStreamingServiceServiceImpl;

import java.time.LocalTime;

import dev.rsdlang.sample.server.service.BuilderFactory;
import io.smallrye.mutiny.Multi;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class StreamLocalTimeHandlerImpl implements ListStreamingServiceServiceImpl.StreamLocalTimeHandler {

	@Override
	public Multi<java.time.LocalTime> streamLocalTime(BuilderFactory _factory) {
		return Multi.createFrom().items(LocalTime.parse("12:00"), LocalTime.parse("23:59"));
	}

}
