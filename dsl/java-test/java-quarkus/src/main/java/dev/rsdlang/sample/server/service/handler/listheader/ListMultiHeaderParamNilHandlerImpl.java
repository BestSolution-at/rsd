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
public class ListMultiHeaderParamNilHandlerImpl
		implements ListHeaderParameterTypesServiceImpl.ListMultiHeaderParamNilHandler {

	@Override
	public List<NilResult> listMultiHeaderParamNil(
			BuilderFactory _factory,
			Optional<List<String>> valueA,
			Optional<List<Integer>> valueB,
			Optional<List<Data>> valueC,
			Optional<List<ZoneId>> zone) {
		return List.of(
				valueA.isPresent() ? NilResult.DEFINED : NilResult.NULL,
				valueB.isPresent() ? NilResult.DEFINED : NilResult.NULL,
				valueC.isPresent() ? NilResult.DEFINED : NilResult.NULL,
				zone.isPresent() ? NilResult.DEFINED : NilResult.NULL);
	}

}
