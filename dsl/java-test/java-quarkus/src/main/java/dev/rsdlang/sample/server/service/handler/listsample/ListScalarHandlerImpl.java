package dev.rsdlang.sample.server.service.handler.listsample;

import java.time.ZoneId;
import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListSampleServiceServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListScalarHandlerImpl implements ListSampleServiceServiceImpl.ListScalarHandler {

	@Override
	public List<ZoneId> listScalar(BuilderFactory _factory) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'listScalar'");
	}

}
