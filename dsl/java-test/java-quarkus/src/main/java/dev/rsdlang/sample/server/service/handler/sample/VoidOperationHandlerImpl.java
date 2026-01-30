package dev.rsdlang.sample.server.service.handler.sample;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.SampleServiceServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class VoidOperationHandlerImpl implements SampleServiceServiceImpl.VoidOperationHandler {

	@Override
	public void voidOperation(BuilderFactory _factory) {

	}

}
