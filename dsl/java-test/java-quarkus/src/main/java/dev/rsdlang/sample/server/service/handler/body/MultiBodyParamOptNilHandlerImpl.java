package dev.rsdlang.sample.server.service.handler.body;

import java.util.function.Function;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.model.SimpleRecord.Data;
import dev.rsdlang.sample.server.model._Base.Nillable;
import dev.rsdlang.sample.server.model.ZoneId;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class MultiBodyParamOptNilHandlerImpl implements BodyParameterTypesServiceImpl.MultiBodyParamOptNilHandler {

	@Override
	public String multiBodyParamOptNil(
			BuilderFactory _factory,
			Nillable<String> valueA,
			Nillable<Integer> valueB,
			Nillable<Data> valueC,
			Nillable<ZoneId> zone) {
		var _valueA = valueA.isNull() ? "null" : valueA.apply(Function.identity(), "undefined");
		var _valueB = valueB.isNull() ? "null" : valueB.apply(Object::toString, "undefined");
		var _valueC = valueC.isNull() ? "null" : valueC.apply(Data::key, "undefined");
		var _zone = zone.isNull() ? "null" : zone.apply(ZoneId::value, "undefined");
		return _valueA + "-" + _valueB + "-" + _valueC + "-" + _zone;
	}

}
