package dev.rsdlang.sample.server.service.handler.body;

import java.util.Optional;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.PatchableRecord;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class PatchableRecordBodyParamNilHandlerImpl
		implements BodyParameterTypesServiceImpl.PatchableRecordBodyParamNilHandler {

	@Override
	public PatchableRecord.Data patchableRecordBodyParamNil(BuilderFactory _factory,
			Optional<PatchableRecord.Patch> bodyRecord) {
		if (!bodyRecord.isPresent()) {
			return _factory.builder(PatchableRecord.DataBuilder.class)
					.key("null")
					.value("null")
					.version("null")
					.build();
		}
		return _factory.builder(PatchableRecord.DataBuilder.class)
				.key(bodyRecord.get().key())
				.value(bodyRecord.get().value().orElse("undefined"))
				.version(bodyRecord.get().version())
				.build();
	}

}
