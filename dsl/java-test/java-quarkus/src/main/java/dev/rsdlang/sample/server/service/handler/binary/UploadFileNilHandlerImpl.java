package dev.rsdlang.sample.server.service.handler.binary;

import java.util.Optional;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BinaryTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.RSDFile;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class UploadFileNilHandlerImpl implements BinaryTypesServiceImpl.UploadFileNilHandler {

	@Override
	public int uploadFileNil(BuilderFactory _factory, Optional<RSDFile> data) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'uploadFileNil'");
	}

}
