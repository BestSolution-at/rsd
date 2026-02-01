package dev.rsdlang.sample.server.service.handler.body;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import dev.rsdlang.sample.server.service.model.Union.Data;
import dev.rsdlang.sample.server.service.model._Base.Nillable;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class UnionBodyParamOptNilHandlerImpl implements BodyParameterTypesServiceImpl.UnionBodyParamOptNilHandler {

	@Override
	public NilResult unionBodyParamOptNil(BuilderFactory _factory, Nillable<Data> bodyUnion) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'unionBodyParamOptNil'");
	}

}
