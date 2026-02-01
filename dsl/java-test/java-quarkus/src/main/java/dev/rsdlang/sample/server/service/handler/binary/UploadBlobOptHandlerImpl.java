package dev.rsdlang.sample.server.service.handler.binary;

import java.util.Optional;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BinaryTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.RSDBlob;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class UploadBlobOptHandlerImpl implements BinaryTypesServiceImpl.UploadBlobOptHandler {

	@Override
	public int uploadBlobOpt(BuilderFactory _factory, Optional<RSDBlob> data) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'uploadBlobOpt'");
	}

}
