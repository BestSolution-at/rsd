package dev.rsdlang.sample.server.service.handler.binary;

import java.util.List;
import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BinaryTypesServiceImpl;
import dev.rsdlang.sample.server.model.RSDBlob;
import dev.rsdlang.sample.server.model.RSDFile;
import dev.rsdlang.sample.server.model.SimpleRecord;
import dev.rsdlang.sample.server.model.ZoneId;
import dev.rsdlang.sample.server.model.UploadMixedResult.Data;
import dev.rsdlang.sample.server.model._Base.Nillable;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class UploadMixedOptNilHandlerImpl implements BinaryTypesServiceImpl.UploadMixedOptNilHandler {

	@Override
	public Data uploadMixedOptNil(BuilderFactory _factory,
			Nillable<String> text,
			Nillable<Integer> number,
			Nillable<SimpleRecord.Data> rec,
			Nillable<ZoneId> zone,
			Nillable<List<String>> textList,
			Nillable<List<Integer>> numberList,
			Nillable<List<SimpleRecord.Data>> recList,
			Nillable<List<ZoneId>> zoneList,
			Nillable<RSDFile> dataFile,
			Nillable<RSDBlob> dataBlob) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'uploadMixedOptNil'");
	}

}
