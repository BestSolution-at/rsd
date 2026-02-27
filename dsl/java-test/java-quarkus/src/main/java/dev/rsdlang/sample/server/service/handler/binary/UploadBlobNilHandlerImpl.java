package dev.rsdlang.sample.server.service.handler.binary;

import java.util.Optional;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BinaryTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.RSDBlob;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class UploadBlobNilHandlerImpl implements BinaryTypesServiceImpl.UploadBlobNilHandler {

	@Override
	public int uploadBlobNil(BuilderFactory _factory, Optional<RSDBlob> data) {
		return data
				.map(v -> StreamUtils.streamLength(v.stream()))
				.orElse(-1);
	}

}
