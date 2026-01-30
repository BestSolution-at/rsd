package dev.rsdlang.sample.server.service.handler.sample;

import java.time.LocalDate;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.SampleServiceServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class GetLocalDateHandlerImpl implements SampleServiceServiceImpl.GetLocalDateHandler {

	@Override
	public LocalDate getLocalDate(BuilderFactory _factory) {
		return LocalDate.parse("2020-01-01");
	}

}
