package dev.rsdlang.sample.server.service.handler.listbody;

import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListBodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.model.NilResult;
import dev.rsdlang.sample.server.model.ZoneId;
import dev.rsdlang.sample.server.model.SimpleRecord.Data;
import dev.rsdlang.sample.server.model._Base.Nillable;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListMultiBodyParamOptNilHandlerImpl
		implements ListBodyParameterTypesServiceImpl.ListMultiBodyParamOptNilHandler {

	@Override
	public List<NilResult> listMultiBodyParamOptNil(
			BuilderFactory _factory,
			Nillable<List<String>> valueA,
			Nillable<List<Integer>> valueB,
			Nillable<List<Data>> valueC,
			Nillable<List<ZoneId>> zone) {
		var a = valueA.isNull() ? NilResult.NULL : valueA.isUndefined() ? NilResult.UNDEFINED : NilResult.DEFINED;
		var b = valueB.isNull() ? NilResult.NULL : valueB.isUndefined() ? NilResult.UNDEFINED : NilResult.DEFINED;
		var c = valueC.isNull() ? NilResult.NULL : valueC.isUndefined() ? NilResult.UNDEFINED : NilResult.DEFINED;
		var d = zone.isNull() ? NilResult.NULL : zone.isUndefined() ? NilResult.UNDEFINED : NilResult.DEFINED;
		return List.of(a, b, c, d);
	}

}
