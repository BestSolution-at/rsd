package dev.rsdlang.sample.server.service.handler.body;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.PatchableRecord;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class PatchableRecordBodyParamHandlerImpl
		implements BodyParameterTypesServiceImpl.PatchableRecordBodyParamHandler {

	@Override
	public PatchableRecord.Data patchableRecordBodyParam(BuilderFactory _factory, PatchableRecord.Patch bodyRecord) {
		return _factory.builder(PatchableRecord.DataBuilder.class)
				.key(bodyRecord.key())
				.version(bodyRecord.version())
				.value(bodyRecord.value().orElse("undefined"))
				.build();
	}

}
