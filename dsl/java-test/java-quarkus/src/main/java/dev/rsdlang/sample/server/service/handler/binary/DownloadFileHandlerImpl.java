package dev.rsdlang.sample.server.service.handler.binary;

import java.io.ByteArrayInputStream;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BinaryTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.RSDFile;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class DownloadFileHandlerImpl implements BinaryTypesServiceImpl.DownloadFileHandler {

	@Override
	public RSDFile downloadFile(BuilderFactory _factory) {
		return _factory.createFile(new ByteArrayInputStream("Hello, World!".getBytes()), "text/plain; charset=UTF-8",
				"hello.txt");
	}

}
