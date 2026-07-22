package dev.rsdlang.sample.server.service.handler.listquery;

import java.util.List;
import java.util.stream.Collectors;

import dev.rsdlang.sample.server.model.SimpleRecord;
import dev.rsdlang.sample.server.model.ZoneId;
import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListQueryParameterTypesServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListMultiQueryParamHandlerImpl implements ListQueryParameterTypesServiceImpl.ListMultiQueryParamHandler {

	@Override
	public String listMultiQueryParam(BuilderFactory _factory,
			List<String> valueA,
			List<Integer> valueB,
			List<SimpleRecord.Data> valueC,
			List<ZoneId> zone) {
		return valueA.stream().collect(Collectors.joining(","))
				+ "-" + valueB.stream().map(String::valueOf).collect(Collectors.joining(","))
				+ "-" + valueC.stream().map(SimpleRecord.Data::key).collect(Collectors.joining(","))
				+ "-" + zone.stream().map(ZoneId::value).collect(Collectors.joining(","));
	}

}
