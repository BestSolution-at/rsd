package dev.rsdlang.sample.server.service.handler.sample;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.SampleServiceServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class GetStringHandlerImpl implements SampleServiceServiceImpl.GetStringHandler {

	@Override
	public String getString(BuilderFactory _factory) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'getString'");
	}

}
