package dev.rsdlang.sample.server.service.handler.body;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BodyParameterTypesServiceImpl;
import dev.rsdlang.sample.server.model.SimpleRecord;
import dev.rsdlang.sample.server.model.ZoneId;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class MultiBodyParamHandlerImpl implements BodyParameterTypesServiceImpl.MultiBodyParamHandler {

	@Override
	public String multiBodyParam(
			BuilderFactory _factory,
			String valueA,
			int valueB,
			SimpleRecord.Data valueC,
			ZoneId zone) {
		return valueA + "-" + valueB + "-" + valueC.key() + "-" + zone.value();
	}

}
