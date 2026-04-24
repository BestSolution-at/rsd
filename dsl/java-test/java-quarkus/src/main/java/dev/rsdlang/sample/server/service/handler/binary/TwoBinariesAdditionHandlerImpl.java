package dev.rsdlang.sample.server.service.handler.binary;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BinaryTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.RSDBlob;
import dev.rsdlang.sample.server.service.model.RSDFile;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class TwoBinariesAdditionHandlerImpl implements BinaryTypesServiceImpl.TwoBinariesAdditionHandler {

	@Override
	public void twoBinariesAddition(BuilderFactory _factory, RSDBlob dataBlob, RSDFile dataFile) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'twoBinariesAddition'");
	}

}
