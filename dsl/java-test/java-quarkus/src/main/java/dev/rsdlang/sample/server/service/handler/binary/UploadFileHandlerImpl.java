package dev.rsdlang.sample.server.service.handler.binary;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BinaryTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.RSDFile;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class UploadFileHandlerImpl implements BinaryTypesServiceImpl.UploadFileHandler {

	@Override
	public int uploadFile(BuilderFactory _factory, RSDFile data) {
		return StreamUtils.streamLength(data.stream());
	}

}
