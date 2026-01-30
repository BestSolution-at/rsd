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
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'listZonedDateTime'");
	}

}
