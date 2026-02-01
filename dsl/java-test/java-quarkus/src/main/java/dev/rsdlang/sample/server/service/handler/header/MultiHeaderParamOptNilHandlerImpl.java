package dev.rsdlang.sample.server.service.handler.header;

import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.HeaderParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import dev.rsdlang.sample.server.service.model._Base.Nillable;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class MultiHeaderParamOptNilHandlerImpl
		implements HeaderParameterTypesServiceImpl.MultiHeaderParamOptNilHandler {

	@Override
	public List<NilResult> multiHeaderParamOptNil(BuilderFactory _factory, Nillable<String> valueA,
			Nillable<Integer> valueB) {
		var resultA = valueA.isNull() ? NilResult.NULL : (valueA.isUndefined() ? NilResult.UNDEFINED : NilResult.DEFINED);
		var resultB = valueB.isNull() ? NilResult.NULL : (valueB.isUndefined() ? NilResult.UNDEFINED : NilResult.DEFINED);
		return List.of(resultA, resultB);
	}

}
