package dev.rsdlang.sample.server.service.handler.liststreaming;

import dev.rsdlang.sample.server.service.impl.ListStreamingServiceServiceImpl;
import dev.rsdlang.sample.server.service.BuilderFactory;
import io.smallrye.mutiny.Multi;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class StreamFloatHandlerImpl implements ListStreamingServiceServiceImpl.StreamFloatHandler {

	@Override
	public Multi<Float> streamFloat(BuilderFactory _factory) {
		return Multi.createFrom().items(Float.MIN_VALUE, Float.MAX_VALUE);
	}

}
