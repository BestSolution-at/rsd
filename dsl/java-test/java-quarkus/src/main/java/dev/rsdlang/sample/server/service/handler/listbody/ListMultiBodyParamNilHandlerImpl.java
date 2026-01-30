package dev.rsdlang.sample.server.service.handler.listbody;

import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListBodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import dev.rsdlang.sample.server.service.model.SimpleRecord.Data;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListMultiBodyParamNilHandlerImpl
		implements ListBodyParameterTypesServiceImpl.ListMultiBodyParamNilHandler {

	@Override
	public List<NilResult> listMultiBodyParamNil(BuilderFactory _factory, List<String> valueA, List<Integer> valueB,
			List<Data> valueC) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'listMultiBodyParamNil'");
	}

}
