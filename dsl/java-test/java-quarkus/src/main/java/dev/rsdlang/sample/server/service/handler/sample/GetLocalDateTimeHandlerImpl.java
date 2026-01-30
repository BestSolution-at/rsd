package dev.rsdlang.sample.server.service.handler.sample;

import java.time.LocalDateTime;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.SampleServiceServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class GetLocalDateTimeHandlerImpl implements SampleServiceServiceImpl.GetLocalDateTimeHandler {

	@Override
	public LocalDateTime getLocalDateTime(BuilderFactory _factory) {
		return LocalDateTime.parse("2020-01-01T10:00:00");
	}

}
