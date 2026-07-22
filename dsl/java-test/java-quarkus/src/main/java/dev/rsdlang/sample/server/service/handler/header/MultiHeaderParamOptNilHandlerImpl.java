package dev.rsdlang.sample.server.service.handler.header;

import java.util.List;

import dev.rsdlang.sample.server.model.NilResult;
import dev.rsdlang.sample.server.model.ZoneId;
import dev.rsdlang.sample.server.model._Base.Nillable;
import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.HeaderParameterTypesServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class MultiHeaderParamOptNilHandlerImpl
		implements HeaderParameterTypesServiceImpl.MultiHeaderParamOptNilHandler {

	@Override
	public List<NilResult> multiHeaderParamOptNil(
			BuilderFactory _factory,
			Nillable<String> valueA,
			Nillable<Integer> valueB,
			Nillable<ZoneId> zone) {
		var resultA = valueA.isNull() ? NilResult.NULL
				: (valueA.isUndefined() ? NilResult.UNDEFINED : NilResult.DEFINED);
		var resultB = valueB.isNull() ? NilResult.NULL
				: (valueB.isUndefined() ? NilResult.UNDEFINED : NilResult.DEFINED);
		var resultC = zone.isNull() ? NilResult.NULL
				: (zone.isUndefined() ? NilResult.UNDEFINED : NilResult.DEFINED);
		return List.of(resultA, resultB, resultC);
	}

}
