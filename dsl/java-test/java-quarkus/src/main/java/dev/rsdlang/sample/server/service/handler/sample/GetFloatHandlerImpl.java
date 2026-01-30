package dev.rsdlang.sample.server.service.handler.sample;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.SampleServiceServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class GetFloatHandlerImpl implements SampleServiceServiceImpl.GetFloatHandler {

	@Override
	public float getFloat(BuilderFactory _factory) {
		return 123.45f;
	}

}
