package dev.rsdlang.sample.server.service.handler.listbody;

import java.util.List;
import java.util.stream.Collectors;

import dev.rsdlang.sample.server.model.SimpleRecord.Data;
import dev.rsdlang.sample.server.model.ZoneId;
import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListBodyParameterTypesServiceImpl;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListMultiBodyParamHandlerImpl implements ListBodyParameterTypesServiceImpl.ListMultiBodyParamHandler {

	@Override
	public String listMultiBodyParam(
			BuilderFactory _factory,
			List<String> valueA,
			List<Integer> valueB,
			List<Data> valueC,
			List<ZoneId> zone) {
		var a = valueA.stream().collect(Collectors.joining(","));
		var b = valueB.stream().map(String::valueOf).collect(Collectors.joining(","));
		var c = valueC.stream().map(d -> d.key()).collect(Collectors.joining(","));
		var d = zone.stream().map(z -> z.value()).collect(Collectors.joining(","));
		return String.format(List.of(a, b, c, d).stream().collect(Collectors.joining("-")));
	}

}
