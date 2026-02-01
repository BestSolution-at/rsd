package dev.rsdlang.sample.server.service.handler.binary;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BinaryTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.RSDBlob;
import dev.rsdlang.sample.server.service.model._Base.Nillable;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class UploadBlobOptNilHandlerImpl implements BinaryTypesServiceImpl.UploadBlobOptNilHandler {

	@Override
	public int uploadBlobOptNil(BuilderFactory _factory, Nillable<RSDBlob> data) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'uploadBlobOptNil'");
	}

}
