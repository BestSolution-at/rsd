package dev.rsdlang.sample.server.service.handler.sample;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.SampleServiceServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class GetShortHandlerImpl implements SampleServiceServiceImpl.GetShortHandler {

	@Override
	public short getShort(BuilderFactory _factory) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'getShort'");
	}

}
