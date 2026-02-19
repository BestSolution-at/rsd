package dev.rsdlang.sample.server.service.handler.listbody;

import java.util.List;
import java.util.Optional;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListBodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import dev.rsdlang.sample.server.service.model.SampleEnum;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListEnumBodyParamOptHandlerImpl implements ListBodyParameterTypesServiceImpl.ListEnumBodyParamOptHandler {

	@Override
	public NilResult listEnumBodyParamOpt(BuilderFactory _factory, Optional<List<SampleEnum>> bodyEnum) {
		return bodyEnum.isPresent() ? NilResult.DEFINED : NilResult.UNDEFINED;
	}

}
