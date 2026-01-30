package dev.rsdlang.sample.server.service.handler.sample;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.SampleServiceServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class GetLongHandlerImpl implements SampleServiceServiceImpl.GetLongHandler {

	@Override
	public long getLong(BuilderFactory _factory) {
		return 1234567890123L;
	}

}
