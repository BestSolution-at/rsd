package dev.rsdlang.sample.server.service.handler.binary;

import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BinaryTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.RSDFile;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class UploadFileListOptNilHandlerImpl implements BinaryTypesServiceImpl.UploadFileListOptNilHandler {

	@Override
	public int uploadFileListOptNil(BuilderFactory _factory, List<RSDFile> data) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'uploadFileListOptNil'");
	}

}
