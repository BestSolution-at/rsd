package dev.rsdlang.sample.server.service.handler.sample;

import java.time.OffsetDateTime;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.SampleServiceServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class GetOffsetDateTimeHandlerImpl implements SampleServiceServiceImpl.GetOffsetDateTimeHandler {

	@Override
	public OffsetDateTime getOffsetDateTime(BuilderFactory _factory) {
		return OffsetDateTime.parse("2025-01-01T10:00:00+01:00");
	}

}