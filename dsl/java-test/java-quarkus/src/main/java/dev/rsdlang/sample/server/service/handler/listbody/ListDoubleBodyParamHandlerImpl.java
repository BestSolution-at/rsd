package dev.rsdlang.sample.server.service.handler.listbody;

import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListBodyParameterTypesServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListDoubleBodyParamHandlerImpl implements ListBodyParameterTypesServiceImpl.ListDoubleBodyParamHandler {

	@Override
	public List<Double> listDoubleBodyParam(BuilderFactory _factory, List<Double> bodyDouble) {
		return bodyDouble;
	}

}
