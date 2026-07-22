package dev.rsdlang.sample.server.service.handler.listheader;

import java.util.List;
import java.util.Optional;

import dev.rsdlang.sample.server.model.NilResult;
import dev.rsdlang.sample.server.model.SimpleRecord.Data;
import dev.rsdlang.sample.server.model.ZoneId;
import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListHeaderParameterTypesServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListMultiHeaderParamOptHandlerImpl
		implements ListHeaderParameterTypesServiceImpl.ListMultiHeaderParamOptHandler {

	@Override
	public List<NilResult> listMultiHeaderParamOpt(
			BuilderFactory _factory,
			Optional<List<String>> valueA,
			Optional<List<Integer>> valueB,
			Optional<List<Data>> valueC,
			Optional<List<ZoneId>> zone) {
		return List.of(
				valueA.isPresent() ? NilResult.DEFINED : NilResult.UNDEFINED,
				valueB.isPresent() ? NilResult.DEFINED : NilResult.UNDEFINED,
				valueC.isPresent() ? NilResult.DEFINED : NilResult.UNDEFINED,
				zone.isPresent() ? NilResult.DEFINED : NilResult.UNDEFINED);
	}

}
