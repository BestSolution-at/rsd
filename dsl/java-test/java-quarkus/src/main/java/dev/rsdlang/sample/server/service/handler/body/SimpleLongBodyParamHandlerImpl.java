package dev.rsdlang.sample.server.service.handler.body;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BodyParameterTypesServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SimpleLongBodyParamHandlerImpl implements BodyParameterTypesServiceImpl.SimpleLongBodyParamHandler {

	@Override
	public long simpleLongBodyParam(BuilderFactory _factory, long bodyLong) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'simpleLongBodyParam'");
	}

}
