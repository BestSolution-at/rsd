package dev.rsdlang.sample.server.service.handler.liststreaming;

import dev.rsdlang.sample.server.service.impl.ListStreamingServiceServiceImpl;
import dev.rsdlang.sample.server.service.BuilderFactory;
import io.smallrye.mutiny.Multi;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class StreamIntHandlerImpl implements ListStreamingServiceServiceImpl.StreamIntHandler {

	@Override
	public Multi<Integer> streamInt(BuilderFactory _factory) {
		return Multi.createFrom().items(Integer.MIN_VALUE, Integer.MAX_VALUE);
	}
}
