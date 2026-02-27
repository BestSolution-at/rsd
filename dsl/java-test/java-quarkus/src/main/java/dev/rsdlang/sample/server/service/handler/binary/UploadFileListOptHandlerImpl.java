package dev.rsdlang.sample.server.service.handler.binary;

import java.util.List;
import java.util.Optional;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BinaryTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.RSDFile;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class UploadFileListOptHandlerImpl implements BinaryTypesServiceImpl.UploadFileListOptHandler {

	@Override
	public int uploadFileListOpt(BuilderFactory _factory, Optional<List<RSDFile>> data) {
		return data.map(list -> list.stream()
				.mapToInt(e -> StreamUtils.streamLength(e.stream()))
				.sum())
				.orElse(0);
	}

}
