package dev.rsdlang.sample.server.service.handler.binary;

import java.util.List;
import java.util.Optional;
import java.util.OptionalInt;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BinaryTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.RSDBlob;
import dev.rsdlang.sample.server.service.model.RSDFile;
import dev.rsdlang.sample.server.service.model.SimpleRecord;
import dev.rsdlang.sample.server.service.model.UploadMixedResult.Data;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class UploadMixedOptHandlerImpl implements BinaryTypesServiceImpl.UploadMixedOptHandler {

	@Override
	public Data uploadMixedOpt(BuilderFactory _factory, Optional<String> text, OptionalInt number,
			Optional<SimpleRecord.Data> rec, Optional<List<String>> textList,
			Optional<List<Integer>> numberList,
			Optional<List<SimpleRecord.Data>> recList, Optional<RSDFile> dataFile,
			Optional<RSDBlob> dataBlob) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'uploadMixedOpt'");
	}

}
