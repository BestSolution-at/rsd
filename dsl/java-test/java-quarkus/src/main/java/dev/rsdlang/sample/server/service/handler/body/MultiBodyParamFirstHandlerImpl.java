package dev.rsdlang.sample.server.service.handler.body;

import java.util.Optional;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.SimpleRecord.Data;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class MultiBodyParamFirstHandlerImpl implements BodyParameterTypesServiceImpl.MultiBodyParamFirstHandler {

	@Override
	public String multiBodyParamFirst(BuilderFactory _factory, Optional<String> valueA, int valueB, Data valueC) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'multiBodyParamFirst'");
	}

}
