package dev.rsdlang.sample.server.service.handler.listsample;

import java.time.LocalDateTime;
import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListSampleServiceServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListLocalDateTimeHandlerImpl implements ListSampleServiceServiceImpl.ListLocalDateTimeHandler {

	@Override
	public List<LocalDateTime> listLocalDateTime(BuilderFactory _factory) {
		return List.of(LocalDateTime.parse("2020-01-01T10:00:00"), LocalDateTime.parse("2021-02-02T11:30:00"),
				LocalDateTime.parse("2022-03-03T12:45:00"));
	}

}
