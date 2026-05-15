package dev.rsdlang.sample.server.service.handler.binary;

import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BinaryTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.RSDBlob;
import dev.rsdlang.sample.server.service.model.RSDFile;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class TwoBinariesAdditionHandlerImpl implements BinaryTypesServiceImpl.TwoBinariesAdditionHandler {

	@Override
	public List<Integer> twoBinariesAddition(BuilderFactory _factory, RSDBlob dataBlob, RSDFile dataFile) {
		return List.of(StreamUtils.streamLength(dataBlob.stream()), StreamUtils.streamLength(dataFile.stream()));
	}

}
