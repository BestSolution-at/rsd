package dev.rsdlang.sample.server.service.handler.listheader;

import java.util.List;
import java.util.Optional;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListHeaderParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import dev.rsdlang.sample.server.service.model.SimpleRecord.Data;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListMultiHeaderParamOptHandlerImpl
		implements ListHeaderParameterTypesServiceImpl.ListMultiHeaderParamOptHandler {

	@Override
	public List<NilResult> listMultiHeaderParamOpt(BuilderFactory _factory, Optional<List<String>> valueA,
			Optional<List<Integer>> valueB, Optional<List<Data>> valueC) {
		return List.of(
				valueA.isPresent() ? NilResult.DEFINED : NilResult.UNDEFINED,
				valueB.isPresent() ? NilResult.DEFINED : NilResult.UNDEFINED,
				valueC.isPresent() ? NilResult.DEFINED : NilResult.UNDEFINED);
	}

}
