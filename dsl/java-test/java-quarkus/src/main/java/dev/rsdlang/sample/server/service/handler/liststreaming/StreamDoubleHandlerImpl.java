package dev.rsdlang.sample.server.service.handler.liststreaming;

import dev.rsdlang.sample.server.service.impl.ListStreamingServiceServiceImpl;
import dev.rsdlang.sample.server.service.BuilderFactory;
import io.smallrye.mutiny.Multi;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class StreamDoubleHandlerImpl
		implements ListStreamingServiceServiceImpl.StreamDoubleHandler {

	@Override
	public Multi<Double> streamDouble(BuilderFactory _factory) {
		return Multi.createFrom().items(Double.MIN_VALUE, Double.MAX_VALUE);
	}

}
