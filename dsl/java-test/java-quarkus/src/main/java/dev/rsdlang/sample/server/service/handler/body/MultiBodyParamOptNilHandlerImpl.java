package dev.rsdlang.sample.server.service.handler.body;

import java.util.function.Function;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.SimpleRecord.Data;
import dev.rsdlang.sample.server.service.model._Base.Nillable;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class MultiBodyParamOptNilHandlerImpl implements BodyParameterTypesServiceImpl.MultiBodyParamOptNilHandler {

	@Override
	public String multiBodyParamOptNil(BuilderFactory _factory, Nillable<String> valueA, Nillable<Integer> valueB,
			Nillable<Data> valueC) {
		var _valueA = valueA.isNull() ? "null" : valueA.apply(Function.identity(), "undefined");
		var _valueB = valueB.isNull() ? "null" : valueB.apply(Object::toString, "undefined");
		var _valueC = valueC.isNull() ? "null" : valueC.apply(Data::key, "undefined");
		return _valueA + "-" + _valueB + "-" + _valueC;
	}

}
