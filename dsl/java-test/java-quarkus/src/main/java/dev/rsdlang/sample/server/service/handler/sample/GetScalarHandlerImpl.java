package dev.rsdlang.sample.server.service.handler.sample;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.SampleServiceServiceImpl;
import dev.rsdlang.sample.server.model.ZoneId;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class GetScalarHandlerImpl implements SampleServiceServiceImpl.GetScalarHandler {

	@Override
	public ZoneId getScalar(BuilderFactory _factory) {
		return ZoneId.of("Europe/Vienna");
	}

}
