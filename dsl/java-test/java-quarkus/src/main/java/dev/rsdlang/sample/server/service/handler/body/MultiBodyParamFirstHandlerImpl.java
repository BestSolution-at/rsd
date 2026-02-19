package dev.rsdlang.sample.server.service.handler.body;

import java.util.Optional;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.SimpleRecord;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class MultiBodyParamFirstHandlerImpl implements BodyParameterTypesServiceImpl.MultiBodyParamFirstHandler {

	@Override
	public String multiBodyParamFirst(BuilderFactory _factory, Optional<String> valueA, int valueB,
			SimpleRecord.Data valueC) {
		return valueA.orElse("undefined") + "-" + valueB + "-" + valueC.key();
	}

}
