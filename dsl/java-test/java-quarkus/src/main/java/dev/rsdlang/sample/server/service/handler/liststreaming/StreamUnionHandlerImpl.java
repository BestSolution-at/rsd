package dev.rsdlang.sample.server.service.handler.liststreaming;

import dev.rsdlang.sample.server.service.impl.ListStreamingServiceServiceImpl;
import dev.rsdlang.sample.server.model.Union;
import dev.rsdlang.sample.server.model.UnionA;
import dev.rsdlang.sample.server.model.UnionB;
import dev.rsdlang.sample.server.service.BuilderFactory;
import io.smallrye.mutiny.Multi;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class StreamUnionHandlerImpl implements ListStreamingServiceServiceImpl.StreamUnionHandler {

	@Override
	public Multi<Union.Data> streamUnion(BuilderFactory _factory) {
		var union1 = _factory.builder(UnionA.DataBuilder.class)
				.shared("Foo")
				.valueA("A")
				.build();
		var union2 = _factory.builder(UnionB.DataBuilder.class)
				.shared("Bar")
				.valueB("B")
				.build();
		return Multi.createFrom().items(union1, union2);
	}

}
