package dev.rsdlang.sample.server.service.handler.listsample;

import java.time.LocalDate;
import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListSampleServiceServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListLocalDateHandlerImpl implements ListSampleServiceServiceImpl.ListLocalDateHandler {

	@Override
	public List<LocalDate> listLocalDate(BuilderFactory _factory) {
		return List.of(LocalDate.parse("2020-01-01"), LocalDate.parse("2021-02-02"), LocalDate.parse("2022-03-03"));
	}

}
