package dev.rsdlang.sample.server.service.handler.binary;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BinaryTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.RSDBlob;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SingleBodyAdditionHandlerIml implements BinaryTypesServiceImpl.SingleBodyAdditionHandler {

	@Override
	public void singleBodyAddition(BuilderFactory _factory, String name, RSDBlob dataBlob) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'singleBodyAddition'");
	}

}
