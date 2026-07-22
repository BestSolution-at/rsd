package dev.rsdlang.sample.server.service.handler.body;

import java.util.Optional;
import java.util.OptionalInt;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.model.SimpleRecord.Data;
import dev.rsdlang.sample.server.model.ZoneId;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class MultiBodyParamOptHandlerImpl implements BodyParameterTypesServiceImpl.MultiBodyParamOptHandler {

	@Override
	public String multiBodyParamOpt(
			BuilderFactory _factory,
			Optional<String> valueA,
			OptionalInt valueB,
			Optional<Data> valueC,
			Optional<ZoneId> zone) {
		return valueA.orElse("undefined")
				+ "-" + (valueB.isPresent() ? valueB.getAsInt() : "undefined")
				+ "-" + (valueC.isPresent() ? valueC.get().key() : "undefined")
				+ "-" + (zone.isPresent() ? zone.get().value() : "undefined");
	}

}
