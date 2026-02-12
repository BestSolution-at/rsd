package dev.rsdlang.sample.server.service.handler.listheader;

import java.util.List;
import java.util.stream.Collectors;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListHeaderParameterTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.SimpleRecord.Data;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListMultiHeaderParamHandlerImpl
		implements ListHeaderParameterTypesServiceImpl.ListMultiHeaderParamHandler {

	@Override
	public String listMultiHeaderParam(BuilderFactory _factory, List<String> valueA, List<Integer> valueB,
			List<Data> valueC) {
		return valueA.stream().collect(Collectors.joining(",")) + "-"
				+ valueB.stream().map(String::valueOf).collect(Collectors.joining(",")) + "-"
				+ valueC.stream().map(d -> d.key()).collect(Collectors.joining(","));
	}

}
