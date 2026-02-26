package dev.rsdlang.sample.server.service.handler.binary;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BinaryTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.RSDBlob;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class UploadBlobHandlerImpl implements BinaryTypesServiceImpl.UploadBlobHandler {

	@Override
	public int uploadBlob(BuilderFactory _factory, RSDBlob data) {
		return (int) StreamUtils.streamLength(data.stream());
	}

}
