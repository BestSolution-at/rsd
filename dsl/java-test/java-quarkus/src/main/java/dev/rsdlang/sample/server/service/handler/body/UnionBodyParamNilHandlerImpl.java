package dev.rsdlang.sample.server.service.handler.body;

import java.util.Optional;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import dev.rsdlang.sample.server.service.model.Union.Data;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class UnionBodyParamNilHandlerImpl implements BodyParameterTypesServiceImpl.UnionBodyParamNilHandler {

	@Override
	public NilResult unionBodyParamNil(BuilderFactory _factory, Optional<Data> bodyUnion) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'unionBodyParamNil'");
	}

}
