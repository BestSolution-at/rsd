package dev.rsdlang.sample.server.service.handler.body;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.SimpleRecord.Data;
import dev.rsdlang.sample.server.service.model._Base.Nillable;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class MultiBodyParamOptNilHandlerImpl implements BodyParameterTypesServiceImpl.MultiBodyParamOptNilHandler {

	@Override
	public String multiBodyParamOptNil(BuilderFactory _factory, Nillable<String> valueA, Nillable<Integer> valueB,
			Nillable<Data> valueC) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'multiBodyParamOptNil'");
	}

}
