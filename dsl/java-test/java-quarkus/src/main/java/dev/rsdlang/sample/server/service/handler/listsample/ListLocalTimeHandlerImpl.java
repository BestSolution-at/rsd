package dev.rsdlang.sample.server.service.handler.listsample;

import java.time.LocalTime;
import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListSampleServiceServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListLocalTimeHandlerImpl implements ListSampleServiceServiceImpl.ListLocalTimeHandler {

	@Override
	public List<LocalTime> listLocalTime(BuilderFactory _factory) {
		return List.of(LocalTime.parse("10:00:00"), LocalTime.parse("11:30:00"), LocalTime.parse("12:45:00"));
	}

}
