package dev.rsdlang.sample.server.service.handler.listsample;

import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListSampleServiceServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListDoubleHandlerImpl implements ListSampleServiceServiceImpl.ListDoubleHandler {

	@Override
	public List<Double> listDouble(BuilderFactory _factory) {
		return List.of(12.3456789, 98.7654321, 54.3210987);
	}

}
