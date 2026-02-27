package dev.rsdlang.sample.server.service.handler.binary;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BinaryTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.RSDFile;
import dev.rsdlang.sample.server.service.model._Base.Nillable;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class UploadFileOptNilHandlerImpl implements BinaryTypesServiceImpl.UploadFileOptNilHandler {

	@Override
	public int uploadFileOptNil(BuilderFactory _factory, Nillable<RSDFile> data) {
		if (data.isNull()) {
			return -1;
		} else if (data.isUndefined()) {
			return 0;
		}
		return data.apply(v -> StreamUtils.streamLength(v.stream()), -1);
	}

}
