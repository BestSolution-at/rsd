package dev.rsdlang.sample.server.service.handler.liststreaming;

import dev.rsdlang.sample.server.service.impl.ListStreamingServiceServiceImpl;
import dev.rsdlang.sample.server.service.BuilderFactory;
import io.smallrye.mutiny.Multi;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class StreamLongHandlerImpl implements ListStreamingServiceServiceImpl.StreamLongHandler {

	@Override
	public Multi<Long> streamLong(BuilderFactory _factory) {
		return Multi.createFrom().items(Long.MIN_VALUE, Long.MAX_VALUE);
	}

}
