package dev.rsdlang.sample.server.service.handler.sample;

import java.time.LocalTime;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.SampleServiceServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class GetLocalTimeHandlerImpl implements SampleServiceServiceImpl.GetLocalTimeHandler {

	@Override
	public LocalTime getLocalTime(BuilderFactory _factory) {
		return LocalTime.parse("10:00:00");
	}

}
