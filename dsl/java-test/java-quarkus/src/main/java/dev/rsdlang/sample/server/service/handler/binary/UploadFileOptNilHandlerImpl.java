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
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'uploadFileOptNil'");
	}

}
