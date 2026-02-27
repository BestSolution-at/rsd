package dev.rsdlang.sample.server.service.handler.binary;

import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BinaryTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.RSDFile;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class UploadFileListHandlerImpl implements BinaryTypesServiceImpl.UploadFileListHandler {

	@Override
	public int uploadFileList(BuilderFactory _factory, List<RSDFile> data) {
		return data.stream()
				.mapToInt(e -> StreamUtils.streamLength(e.stream()))
				.sum();
	}

}
