package dev.rsdlang.sample.server.service.handler.sample;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.SampleServiceServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class GetIntHandlerImpl implements SampleServiceServiceImpl.GetIntHandler {

	@Override
	public int getInt(BuilderFactory _factory) {
		return 123456;
	}

}
