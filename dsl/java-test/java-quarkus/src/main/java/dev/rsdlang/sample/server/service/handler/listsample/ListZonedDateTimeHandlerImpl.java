package dev.rsdlang.sample.server.service.handler.listsample;

import java.time.ZonedDateTime;
import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListSampleServiceServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListZonedDateTimeHandlerImpl implements ListSampleServiceServiceImpl.ListZonedDateTimeHandler {

	@Override
	public List<ZonedDateTime> listZonedDateTime(BuilderFactory _factory) {
		return List.of(ZonedDateTime.parse("2020-01-01T10:00:00Z"),
				ZonedDateTime.parse("2021-02-02T11:30:00Z"),
				ZonedDateTime.parse("2022-03-03T12:45:00Z"));
	}

}
