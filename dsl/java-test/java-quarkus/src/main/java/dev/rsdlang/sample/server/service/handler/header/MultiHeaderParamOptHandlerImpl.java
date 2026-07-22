package dev.rsdlang.sample.server.service.handler.header;

import java.util.List;
import java.util.Optional;
import java.util.OptionalInt;

import dev.rsdlang.sample.server.model.NilResult;
import dev.rsdlang.sample.server.model.ZoneId;
import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.HeaderParameterTypesServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class MultiHeaderParamOptHandlerImpl implements HeaderParameterTypesServiceImpl.MultiHeaderParamOptHandler {

	@Override
	public List<NilResult> multiHeaderParamOpt(
			BuilderFactory _factory,
			Optional<String> valueA,
			OptionalInt valueB,
			Optional<ZoneId> zone) {
		var resultA = valueA.isPresent() ? NilResult.DEFINED : NilResult.UNDEFINED;
		var resultB = valueB.isPresent() ? NilResult.DEFINED : NilResult.UNDEFINED;
		var resultC = zone.isPresent() ? NilResult.DEFINED : NilResult.UNDEFINED;
		return List.of(resultA, resultB, resultC);
	}

}
