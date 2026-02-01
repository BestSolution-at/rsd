package dev.rsdlang.sample.server.service.handler.listsample;

import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListSampleServiceServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListShortHandlerImpl implements ListSampleServiceServiceImpl.ListShortHandler {

	@Override
	public List<Short> listShort(BuilderFactory _factory) {
		return List.of((short) 123, (short) 456, (short) 789);
	}

}
