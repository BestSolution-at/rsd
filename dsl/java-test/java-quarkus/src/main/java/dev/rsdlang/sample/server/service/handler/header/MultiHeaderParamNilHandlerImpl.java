package dev.rsdlang.sample.server.service.handler.header;

import java.util.List;
import java.util.Optional;
import java.util.OptionalInt;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.HeaderParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class MultiHeaderParamNilHandlerImpl implements HeaderParameterTypesServiceImpl.MultiHeaderParamNilHandler {

	@Override
	public List<NilResult> multiHeaderParamNil(BuilderFactory _factory, Optional<String> valueA, OptionalInt valueB) {
		var resultA = valueA.isPresent() ? NilResult.DEFINED : NilResult.NULL;
		var resultB = valueB.isPresent() ? NilResult.DEFINED : NilResult.NULL;
		return List.of(resultA, resultB);
	}

}
