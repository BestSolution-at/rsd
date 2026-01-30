package dev.rsdlang.sample.server.service.handler.listsample;

import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListSampleServiceServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListBooleanHandlerImpl implements ListSampleServiceServiceImpl.ListBooleanHandler {

	@Override
	public List<Boolean> listBoolean(BuilderFactory _factory) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'listBoolean'");
	}

}
