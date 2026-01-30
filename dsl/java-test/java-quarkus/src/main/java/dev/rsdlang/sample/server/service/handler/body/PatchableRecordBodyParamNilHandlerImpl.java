package dev.rsdlang.sample.server.service.handler.body;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.PatchableRecord.Data;
import dev.rsdlang.sample.server.service.model.PatchableRecord.Patch;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class PatchableRecordBodyParamNilHandlerImpl
		implements BodyParameterTypesServiceImpl.PatchableRecordBodyParamNilHandler {

	@Override
	public Data patchableRecordBodyParamNil(BuilderFactory _factory, Patch bodyRecord) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'patchableRecordBodyParamNil'");
	}

}
