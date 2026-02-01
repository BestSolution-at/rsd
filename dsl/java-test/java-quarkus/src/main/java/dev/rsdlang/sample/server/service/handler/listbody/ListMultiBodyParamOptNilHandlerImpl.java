package dev.rsdlang.sample.server.service.handler.listbody;

import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListBodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import dev.rsdlang.sample.server.service.model.SimpleRecord.Data;
import dev.rsdlang.sample.server.service.model._Base.Nillable;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListMultiBodyParamOptNilHandlerImpl
		implements ListBodyParameterTypesServiceImpl.ListMultiBodyParamOptNilHandler {

	@Override
	public List<NilResult> listMultiBodyParamOptNil(BuilderFactory _factory, Nillable<List<String>> valueA,
			Nillable<List<Integer>> valueB, Nillable<List<Data>> valueC) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'listMultiBodyParamOptNil'");
	}

}
