package dev.rsdlang.sample.server.service.handler.binary;

import java.io.IOException;
import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BinaryTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.RSDBlob;
import dev.rsdlang.sample.server.service.model.RSDFile;
import dev.rsdlang.sample.server.service.model.SimpleRecord;
import dev.rsdlang.sample.server.service.model.UploadMixedResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class UploadMixedHandlerImpl implements BinaryTypesServiceImpl.UploadMixedHandler {

	@Override
	public UploadMixedResult.Data uploadMixed(BuilderFactory _factory,
			String text,
			int number,
			SimpleRecord.Data rec,
			List<String> textList,
			List<Integer> numberList,
			List<SimpleRecord.Data> recList,
			RSDFile dataFile,
			RSDBlob dataBlob) {
		return _factory.builder(UploadMixedResult.DataBuilder.class)
				.text(text)
				.number(number)
				.rec(rec)
				.textList(textList)
				.numberList(numberList)
				.recList(recList)
				.dataFileContent(StreamUtils.streamToString(dataFile.stream()))
				.dataBlobContent(StreamUtils.streamToString(dataBlob.stream()))
				.build();
	}

}
