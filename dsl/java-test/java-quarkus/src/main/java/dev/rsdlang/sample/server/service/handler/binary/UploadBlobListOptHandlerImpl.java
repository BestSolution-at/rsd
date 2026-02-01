package dev.rsdlang.sample.server.service.handler.binary;

import java.util.List;
import java.util.Optional;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BinaryTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.RSDBlob;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class UploadBlobListOptHandlerImpl implements BinaryTypesServiceImpl.UploadBlobListOptHandler {

	@Override
	public int uploadBlobListOpt(BuilderFactory _factory, Optional<List<RSDBlob>> data) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'uploadBlobListOpt'");
	}

}
