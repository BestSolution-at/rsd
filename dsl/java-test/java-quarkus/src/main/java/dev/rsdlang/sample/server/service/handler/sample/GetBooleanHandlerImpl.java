package dev.rsdlang.sample.server.service.handler.sample;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.SampleServiceServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class GetBooleanHandlerImpl implements SampleServiceServiceImpl.GetBooleanHandler {

	@Override
	public boolean getBoolean(BuilderFactory _factory) {
		return true;
	}

}
