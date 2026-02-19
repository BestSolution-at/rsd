package dev.rsdlang.sample.server.service.handler.listbody;

import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListBodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import dev.rsdlang.sample.server.service.model.SimpleRecord.Data;
import dev.rsdlang.sample.server.service.model._Base.Nillable;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListMultiBodyParamOptNilHandlerImpl
		implements ListBodyParameterTypesServiceImpl.ListMultiBodyParamOptNilHandler {

	@Override
	public List<NilResult> listMultiBodyParamOptNil(BuilderFactory _factory, Nillable<List<String>> valueA,
			Nillable<List<Integer>> valueB, Nillable<List<Data>> valueC) {
		var a = valueA.isNull() ? NilResult.NULL : valueA.isUndefined() ? NilResult.UNDEFINED : NilResult.DEFINED;
		var b = valueB.isNull() ? NilResult.NULL : valueB.isUndefined() ? NilResult.UNDEFINED : NilResult.DEFINED;
		var c = valueC.isNull() ? NilResult.NULL : valueC.isUndefined() ? NilResult.UNDEFINED : NilResult.DEFINED;
		return List.of(a, b, c);
	}

}
