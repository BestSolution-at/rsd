package dev.rsdlang.sample.server.service.handler.binary;

import java.util.List;
import java.util.Optional;
import java.util.OptionalInt;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BinaryTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.RSDBlob;
import dev.rsdlang.sample.server.service.model.RSDFile;
import dev.rsdlang.sample.server.service.model.SimpleRecord;
import dev.rsdlang.sample.server.service.model.UploadMixedResult;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class UploadMixedNilHandlerImpl implements BinaryTypesServiceImpl.UploadMixedNilHandler {

	@Override
	public UploadMixedResult.Data uploadMixedNil(BuilderFactory _factory,
			Optional<String> text,
			OptionalInt number,
			Optional<SimpleRecord.Data> rec,
			Optional<List<String>> textList,
			Optional<List<Integer>> numberList,
			Optional<List<SimpleRecord.Data>> recList,
			Optional<RSDFile> dataFile,
			Optional<RSDBlob> dataBlob) {
		var b = _factory.builder(UploadMixedResult.DataBuilder.class);
		b.text(text.orElse(null))
				.number(number.isEmpty() ? null : number.orElse(-1))
				.rec(rec.orElse(null))
				.textList(textList.orElse(null))
				.numberList(numberList.orElse(null))
				.recList(recList.orElse(null))
				.dataFileContent(dataFile.map(c -> StreamUtils.streamToString(c.stream())).orElse(null))
				.dataBlobContent(dataBlob.map(c -> StreamUtils.streamToString(c.stream())).orElse(null));
		return b.build();
	}

}
