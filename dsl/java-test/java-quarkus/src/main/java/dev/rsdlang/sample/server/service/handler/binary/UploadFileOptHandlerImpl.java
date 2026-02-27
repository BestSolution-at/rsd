package dev.rsdlang.sample.server.service.handler.binary;

import java.util.Optional;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BinaryTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.RSDFile;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class UploadFileOptHandlerImpl implements BinaryTypesServiceImpl.UploadFileOptHandler {

	@Override
	public int uploadFileOpt(BuilderFactory _factory, Optional<RSDFile> data) {
		return data.map(d -> StreamUtils.streamLength(d.stream())).orElse(0);
	}

}
