package dev.rsdlang.sample.server.service.handler.binary;

import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BinaryTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.RSDBlob;
import dev.rsdlang.sample.server.service.model.RSDFile;
import dev.rsdlang.sample.server.service.model.SimpleRecord;
import dev.rsdlang.sample.server.service.model.UploadMixedResult.Data;
import dev.rsdlang.sample.server.service.model._Base.Nillable;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class UploadMixedOptNilHandlerImpl implements BinaryTypesServiceImpl.UploadMixedOptNilHandler {

	@Override
	public Data uploadMixedOptNil(BuilderFactory _factory, Nillable<String> text, Nillable<Integer> number,
			Nillable<SimpleRecord.Data> rec, Nillable<List<String>> textList,
			Nillable<List<Integer>> numberList,
			Nillable<List<SimpleRecord.Data>> recList, Nillable<RSDFile> dataFile,
			Nillable<RSDBlob> dataBlob) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'uploadMixedOptNil'");
	}

}
