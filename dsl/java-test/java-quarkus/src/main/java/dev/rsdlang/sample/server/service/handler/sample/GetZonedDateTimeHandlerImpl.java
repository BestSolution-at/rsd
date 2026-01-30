package dev.rsdlang.sample.server.service.handler.sample;

import java.time.ZonedDateTime;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.SampleServiceServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class GetZonedDateTimeHandlerImpl implements SampleServiceServiceImpl.GetZonedDateTimeHandler {

	@Override
	public ZonedDateTime getZonedDateTime(BuilderFactory _factory) {
		return ZonedDateTime.parse("2025-01-01T10:00:00Z");
	}

}
