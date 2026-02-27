package dev.rsdlang.sample.server.service.handler.binary;

import java.util.List;
import java.util.Optional;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BinaryTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.RSDBlob;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class UploadBlobListNilHandlerImpl implements BinaryTypesServiceImpl.UploadBlobListNilHandler {

	@Override
	public int uploadBlobListNil(BuilderFactory _factory, Optional<List<RSDBlob>> data) {
		return data.map(list -> list.stream()
				.mapToInt(e -> StreamUtils.streamLength(e.stream()))
				.sum())
				.orElse(-1);
	}

}
