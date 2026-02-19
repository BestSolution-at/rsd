package dev.rsdlang.sample.server.service.handler.listbody;

import java.util.List;
import java.util.Optional;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListBodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.NilResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListDoubleBodyParamOptHandlerImpl
		implements ListBodyParameterTypesServiceImpl.ListDoubleBodyParamOptHandler {

	@Override
	public NilResult listDoubleBodyParamOpt(BuilderFactory _factory, Optional<List<Double>> bodyDouble) {
		return bodyDouble.isPresent() ? NilResult.DEFINED : NilResult.UNDEFINED;
	}

}
