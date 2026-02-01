package dev.rsdlang.sample.server.service.handler.listsample;

import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListSampleServiceServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListFloatHandlerImpl implements ListSampleServiceServiceImpl.ListFloatHandler {

	@Override
	public List<Float> listFloat(BuilderFactory _factory) {
		return List.of(12.34f, 56.78f, 90.12f);
	}

}
