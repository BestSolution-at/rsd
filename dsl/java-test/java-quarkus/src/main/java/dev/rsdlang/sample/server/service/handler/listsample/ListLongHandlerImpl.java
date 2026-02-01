package dev.rsdlang.sample.server.service.handler.listsample;

import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListSampleServiceServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListLongHandlerImpl implements ListSampleServiceServiceImpl.ListLongHandler {

	@Override
	public List<Long> listLong(BuilderFactory _factory) {
		return List.of(1234567890123L, 2345678901234L, 3456789012345L);
	}

}
