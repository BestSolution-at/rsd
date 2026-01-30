package dev.rsdlang.sample.server.service.handler.sample;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.SampleServiceServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class GetDoubleHandlerImpl implements SampleServiceServiceImpl.GetDoubleHandler {

	@Override
	public double getDouble(BuilderFactory _factory) {
		return 123.456789d;
	}

}
