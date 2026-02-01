package dev.rsdlang.sample.server.service.handler.body;

import java.util.Optional;
import java.util.OptionalInt;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.SimpleRecord.Data;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class MultiBodyParamNilHandlerImpl implements BodyParameterTypesServiceImpl.MultiBodyParamNilHandler {

	@Override
	public String multiBodyParamNil(BuilderFactory _factory, Optional<String> valueA, OptionalInt valueB,
			Optional<Data> valueC) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'multiBodyParamNil'");
	}

}
