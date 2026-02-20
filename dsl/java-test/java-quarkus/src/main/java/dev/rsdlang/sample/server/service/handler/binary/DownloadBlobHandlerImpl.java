package dev.rsdlang.sample.server.service.handler.binary;

import java.io.ByteArrayInputStream;
import java.nio.charset.StandardCharsets;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BinaryTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.RSDBlob;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class DownloadBlobHandlerImpl implements BinaryTypesServiceImpl.DownloadBlobHandler {

	@Override
	public RSDBlob downloadBlob(BuilderFactory _factory) {
		return _factory.createBlob(new ByteArrayInputStream("Hello World".getBytes(StandardCharsets.UTF_8)),
				"text/plain; charset=UTF-8");
	}

}
