package dev.rsdlang.sample.server.service.handler.listbody;

import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListBodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.model.ZoneId;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListScalarBodyParamHandlerImpl implements ListBodyParameterTypesServiceImpl.ListScalarBodyParamHandler {

	@Override
	public List<ZoneId> listScalarBodyParam(BuilderFactory _factory, List<ZoneId> bodyScalar) {
		return bodyScalar;
	}

}
