package dev.rsdlang.sample.server.service.handler.binary;

import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BinaryTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.RSDFile;
import dev.rsdlang.sample.server.service.model._Base.Nillable;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class UploadFileListOptNilHandlerImpl implements BinaryTypesServiceImpl.UploadFileListOptNilHandler {

	@Override
	public int uploadFileListOptNil(BuilderFactory _factory, Nillable<List<RSDFile>> data) {

		if (data.isNull()) {
			return -1;
		} else if (data.isUndefined()) {
			return 0;
		}
		return data.apply(list -> list.stream()
				.mapToInt(e -> StreamUtils.streamLength(e.stream()))
				.sum(), -1);
	}

}
