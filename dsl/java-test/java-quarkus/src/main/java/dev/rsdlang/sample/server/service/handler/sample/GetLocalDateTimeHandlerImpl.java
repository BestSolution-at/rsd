package dev.rsdlang.sample.server.service.handler.sample;

import java.time.LocalDateTime;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.SampleServiceServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class GetLocalDateTimeHandlerImpl implements SampleServiceServiceImpl.GetLocalDateTimeHandler {

	@Override
	public LocalDateTime getLocalDateTime(BuilderFactory _factory) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'getLocalDateTime'");
	}

}
