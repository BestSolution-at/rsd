package dev.rsdlang.sample.server.service.handler.listbody;

import java.util.List;
import java.util.Optional;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListBodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import dev.rsdlang.sample.server.service.model.SampleEnum;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListEnumBodyParamNilHandlerImpl implements ListBodyParameterTypesServiceImpl.ListEnumBodyParamNilHandler {

	@Override
	public NilResult listEnumBodyParamNil(BuilderFactory _factory, Optional<List<SampleEnum>> bodyEnum) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'listEnumBodyParamNil'");
	}

}
