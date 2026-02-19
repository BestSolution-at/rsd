package dev.rsdlang.sample.server.service.handler.listbody;

import java.util.List;
import java.util.Optional;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListBodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import dev.rsdlang.sample.server.service.model.SimpleRecord.Data;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListMultiBodyParamNilHandlerImpl
		implements ListBodyParameterTypesServiceImpl.ListMultiBodyParamNilHandler {

	@Override
	public List<NilResult> listMultiBodyParamNil(BuilderFactory _factory, Optional<List<String>> valueA,
			Optional<List<Integer>> valueB, Optional<List<Data>> valueC) {
		var a = valueA.isPresent() ? NilResult.DEFINED : NilResult.NULL;
		var b = valueB.isPresent() ? NilResult.DEFINED : NilResult.NULL;
		var c = valueC.isPresent() ? NilResult.DEFINED : NilResult.NULL;
		return List.of(a, b, c);
	}

}
