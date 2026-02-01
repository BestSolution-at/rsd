package dev.rsdlang.sample.server.service.handler.listsample;

import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.ListSampleServiceServiceImpl;
import dev.rsdlang.sample.server.service.model.SampleEnum;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ListEnumHandlerImpl implements ListSampleServiceServiceImpl.ListEnumHandler {

	@Override
	public List<SampleEnum> listEnum(BuilderFactory _factory) {
		return List.of(SampleEnum.A, SampleEnum.B);
	}

}
