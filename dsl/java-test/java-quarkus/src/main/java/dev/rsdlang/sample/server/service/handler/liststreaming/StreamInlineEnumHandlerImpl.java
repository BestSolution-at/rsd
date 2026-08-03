package dev.rsdlang.sample.server.service.handler.liststreaming;

import dev.rsdlang.sample.server.service.impl.ListStreamingServiceServiceImpl;
import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.ListStreamingServiceService.StreamInlineEnum_Result$;
import io.smallrye.mutiny.Multi;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class StreamInlineEnumHandlerImpl implements ListStreamingServiceServiceImpl.StreamInlineEnumHandler {

	@Override
	public Multi<StreamInlineEnum_Result$> streamInlineEnum(BuilderFactory _factory) {
		// Implement your streaming logic here
		return Multi.createFrom().empty();
	}

}
