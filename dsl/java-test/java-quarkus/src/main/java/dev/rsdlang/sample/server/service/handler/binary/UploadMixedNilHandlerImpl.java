package dev.rsdlang.sample.server.service.handler.binary;

import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BinaryTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.RSDBlob;
import dev.rsdlang.sample.server.service.model.RSDFile;
import dev.rsdlang.sample.server.service.model.UploadMixedResult.Data;

public class UploadMixedNilHandlerImpl implements BinaryTypesServiceImpl.UploadMixedNilHandler {

	@Override
	public Data uploadMixedNil(BuilderFactory _factory, String text, Integer number,
			dev.rsdlang.sample.server.service.model.SimpleRecord.Data rec, List<String> textList, List<Integer> numberList,
			List<dev.rsdlang.sample.server.service.model.SimpleRecord.Data> recList, RSDFile dataFile, RSDBlob dataBlob) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'uploadMixedNil'");
	}

}
