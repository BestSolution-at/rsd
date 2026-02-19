package dev.rsdlang.sample.server.service.handler.body;

import java.util.Optional;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import dev.rsdlang.sample.server.service.model.SimpleRecord.Data;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class RecordBodyParamOptHandlerImpl implements BodyParameterTypesServiceImpl.RecordBodyParamOptHandler {

	@Override
	public NilResult recordBodyParamOpt(BuilderFactory _factory, Optional<Data> bodyRecord) {
		return bodyRecord.isPresent() ? NilResult.DEFINED : NilResult.UNDEFINED;
	}

}
