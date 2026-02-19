package dev.rsdlang.sample.server.service.handler.body;

import java.util.function.Function;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.PatchableRecord;
import dev.rsdlang.sample.server.service.model._Base.Nillable;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class PatchableRecordBodyParamOptNilHandlerImpl
		implements BodyParameterTypesServiceImpl.PatchableRecordBodyParamOptNilHandler {

	@Override
	public PatchableRecord.Data patchableRecordBodyParamOptNil(BuilderFactory _factory,
			Nillable<PatchableRecord.Patch> bodyRecord) {
		if (bodyRecord.isNull()) {
			return _factory.builder(PatchableRecord.DataBuilder.class)
					.key("null")
					.value("null")
					.version("null")
					.build();
		}
		if (bodyRecord.isUndefined()) {
			return _factory.builder(PatchableRecord.DataBuilder.class)
					.key("undefined")
					.value("undefined")
					.version("undefined")
					.build();
		}

		return _factory.builder(PatchableRecord.DataBuilder.class)
				.key(bodyRecord.apply(Function.identity(), null).key())
				.value(bodyRecord.apply(Function.identity(), null).value().orElse("undefined"))
				.version(bodyRecord.apply(Function.identity(), null).version())
				.build();
	}

}
