package dev.rsdlang.sample.server.service.handler.sample;

import dev.rsdlang.sample.server.Headers;
import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.SampleServiceServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class GetBooleanHandlerImpl implements SampleServiceServiceImpl.GetBooleanHandler {
	@Inject
	private Headers headers;

	@Override
	public boolean getBoolean(BuilderFactory _factory) {

		return true;
	}

}
