package dev.rsdlang.sample.server.service.handler.liststreaming;

import dev.rsdlang.sample.server.service.impl.ListStreamingServiceServiceImpl;
import dev.rsdlang.sample.server.service.BuilderFactory;
import io.smallrye.mutiny.Multi;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class StreamStringHandlerImpl implements ListStreamingServiceServiceImpl.StreamStringHandler {

	@Override
	public Multi<String> streamString(BuilderFactory _factory) {
		return Multi.createFrom().items("Hello", "World", "This", "is", "a", "stream", "of", "strings");
	}

}
