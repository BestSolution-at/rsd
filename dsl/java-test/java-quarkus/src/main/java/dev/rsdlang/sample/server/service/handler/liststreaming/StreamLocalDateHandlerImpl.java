package dev.rsdlang.sample.server.service.handler.liststreaming;

import dev.rsdlang.sample.server.service.impl.ListStreamingServiceServiceImpl;

import java.time.LocalDate;

import dev.rsdlang.sample.server.service.BuilderFactory;
import io.smallrye.mutiny.Multi;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class StreamLocalDateHandlerImpl implements ListStreamingServiceServiceImpl.StreamLocalDateHandler {

	@Override
	public Multi<java.time.LocalDate> streamLocalDate(BuilderFactory _factory) {
		return Multi.createFrom().items(LocalDate.parse("2020-01-01"), LocalDate.parse("1970-01-01"));
	}

}
