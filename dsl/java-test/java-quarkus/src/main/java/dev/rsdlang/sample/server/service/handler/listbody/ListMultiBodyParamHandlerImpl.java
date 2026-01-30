package dev.rsdlang.sample.server.service.handler.listbody;

import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListBodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.SimpleRecord.Data;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListMultiBodyParamHandlerImpl implements ListBodyParameterTypesServiceImpl.ListMultiBodyParamHandler {

	@Override
	public String listMultiBodyParam(BuilderFactory _factory, List<String> valueA, List<Integer> valueB,
			List<Data> valueC) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'listMultiBodyParam'");
	}

}
