package dev.rsdlang.sample.server.service.handler.liststreaming;

import dev.rsdlang.sample.server.service.impl.ListStreamingServiceServiceImpl;
import io.smallrye.mutiny.Multi;
import dev.rsdlang.sample.server.MyRange;
import dev.rsdlang.sample.server.service.BuilderFactory;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class StreamScalarHandlerImpl implements ListStreamingServiceServiceImpl.StreamScalarHandler {

	@Override
	public Multi<MyRange> streamScalar(BuilderFactory _factory) {
		// Implement your streaming logic here
		return Multi.createFrom().empty();
	}

}
