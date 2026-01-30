package dev.rsdlang.sample.server.service.handler.sample;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.SampleServiceServiceImpl;
import dev.rsdlang.sample.server.service.model.SampleEnum;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class GetEnumHandlerImpl implements SampleServiceServiceImpl.GetEnumHandler {

	@Override
	public SampleEnum getEnum(BuilderFactory _factory) {
		return SampleEnum.A;
	}

}
