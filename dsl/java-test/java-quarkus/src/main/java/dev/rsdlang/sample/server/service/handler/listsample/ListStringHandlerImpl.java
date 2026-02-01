package dev.rsdlang.sample.server.service.handler.listsample;

import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListSampleServiceServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListStringHandlerImpl implements ListSampleServiceServiceImpl.ListStringHandler {

	@Override
	public List<String> listString(BuilderFactory _factory) {
		return List.of("first", "second", "third");
	}

}
