package dev.rsdlang.sample.server.service.handler.body;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.SimpleRecord;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class RecordBodyParamHandlerImpl implements BodyParameterTypesServiceImpl.RecordBodyParamHandler {

	@Override
	public SimpleRecord.Data recordBodyParam(BuilderFactory _factory, SimpleRecord.Data bodyRecord) {
		return bodyRecord;
	}

}
