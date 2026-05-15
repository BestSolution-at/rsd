package dev.rsdlang.sample.server.service.handler.binary;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BinaryTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.RSDBlob;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SingleBodyAdditionHandlerIml implements BinaryTypesServiceImpl.SingleBodyAdditionHandler {

	@Override
	public String singleBodyAddition(BuilderFactory _factory, String name, RSDBlob dataBlob) {
		return name + StreamUtils.streamToString(dataBlob.stream());
	}

}
