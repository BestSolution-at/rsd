package dev.rsdlang.sample.server.service.handler.body;

import java.util.Optional;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.PatchableRecord;
import dev.rsdlang.sample.server.service.model.PatchableRecord.Data;
import dev.rsdlang.sample.server.service.model.PatchableRecord.Patch;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class PatchableRecordBodyParamOptHandlerImpl
		implements BodyParameterTypesServiceImpl.PatchableRecordBodyParamOptHandler {

	@Override
	public Data patchableRecordBodyParamOpt(BuilderFactory _factory, Optional<Patch> bodyRecord) {
		if (!bodyRecord.isPresent()) {
			return _factory.builder(PatchableRecord.DataBuilder.class)
					.key("undefined")
					.value("undefined")
					.version("undefined")
					.build();
		}
		return _factory.builder(PatchableRecord.DataBuilder.class)
				.key(bodyRecord.get().key())
				.value(bodyRecord.get().value().orElse("undefined"))
				.version(bodyRecord.get().version())
				.build();
	}

}
