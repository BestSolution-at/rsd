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
		text.ifPresent(b::text);
		number.ifPresent(b::number);
		rec.ifPresent(b::rec);
		textList.map(l -> l.isEmpty() ? null : l).ifPresent(b::textList);
		numberList.map(l -> l.isEmpty() ? null : l).ifPresent(b::numberList);
		recList.map(l -> l.isEmpty() ? null : l).ifPresent(b::recList);
		dataFile.map(c -> StreamUtils.streamToString(c.stream())).ifPresent(b::dataFileContent);
		dataBlob.map(c -> StreamUtils.streamToString(c.stream())).ifPresent(b::dataBlobContent);
		return b.build();
	}

}
