package dev.rsdlang.sample.server.service.handler.listbody;

import java.util.List;
import java.util.Optional;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListBodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.model.NilResult;
import dev.rsdlang.sample.server.model.ZoneId;
import dev.rsdlang.sample.server.model.SimpleRecord.Data;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListMultiBodyParamNilHandlerImpl
		implements ListBodyParameterTypesServiceImpl.ListMultiBodyParamNilHandler {

	@Override
	public List<NilResult> listMultiBodyParamNil(
			BuilderFactory _factory,
			Optional<List<String>> valueA,
			Optional<List<Integer>> valueB,
			Optional<List<Data>> valueC,
			Optional<List<ZoneId>> zone) {
		var a = valueA.isPresent() ? NilResult.DEFINED : NilResult.NULL;
		var b = valueB.isPresent() ? NilResult.DEFINED : NilResult.NULL;
		var c = valueC.isPresent() ? NilResult.DEFINED : NilResult.NULL;
		var d = zone.isPresent() ? NilResult.DEFINED : NilResult.NULL;
		return List.of(a, b, c, d);
	}

}
