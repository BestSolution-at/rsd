package dev.rsdlang.sample.server.service.handler.binary;

import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BinaryTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.RSDBlob;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class UploadBlobListHandlerImpl implements BinaryTypesServiceImpl.UploadBlobListHandler {

	@Override
	public int uploadBlobList(BuilderFactory _factory, List<RSDBlob> data) {
		return data.stream()
				.mapToInt(e -> StreamUtils.streamLength(e.stream()))
				.sum();
	}

}
