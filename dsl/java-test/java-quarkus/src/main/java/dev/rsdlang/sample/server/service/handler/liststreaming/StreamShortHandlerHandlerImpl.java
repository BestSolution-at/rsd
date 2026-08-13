package dev.rsdlang.sample.server.service.handler.liststreaming;

import dev.rsdlang.sample.server.service.impl.ListStreamingServiceServiceImpl;
import dev.rsdlang.sample.server.service.BuilderFactory;
import io.smallrye.mutiny.Multi;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class StreamShortHandlerHandlerImpl
		implements ListStreamingServiceServiceImpl.StreamShortHandler {

	@Override
	public Multi<Short> streamShort(BuilderFactory _factory) {
		return Multi.createFrom().items(Short.MIN_VALUE, Short.MAX_VALUE);
	}

}
