package dev.rsdlang.sample.server.service.handler.liststreaming;

import dev.rsdlang.sample.server.service.impl.ListStreamingServiceServiceImpl;
import dev.rsdlang.sample.server.service.BuilderFactory;

import io.smallrye.mutiny.Multi;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class StreamBooleanHandlerImpl implements ListStreamingServiceServiceImpl.StreamBooleanHandler {

	@Override
	public Multi<Boolean> streamBoolean(BuilderFactory _factory) {
		return Multi.createFrom().items(true, false);
	}
}
