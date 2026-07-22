package dev.rsdlang.sample.server.service.handler.binary;

import java.util.List;
import java.util.Optional;
import java.util.OptionalInt;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BinaryTypesServiceImpl;
import dev.rsdlang.sample.server.model.RSDBlob;
import dev.rsdlang.sample.server.model.RSDFile;
import dev.rsdlang.sample.server.model.SimpleRecord;
import dev.rsdlang.sample.server.model.UploadMixedResult;
import dev.rsdlang.sample.server.model.ZoneId;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class UploadMixedOptHandlerImpl implements BinaryTypesServiceImpl.UploadMixedOptHandler {

	@Override
	public UploadMixedResult.Data uploadMixedOpt(BuilderFactory _factory,
			Optional<String> text,
			OptionalInt number,
			Optional<SimpleRecord.Data> rec,
			Optional<ZoneId> zone,
			Optional<List<String>> textList,
			Optional<List<Integer>> numberList,
			Optional<List<SimpleRecord.Data>> recList,
			Optional<List<ZoneId>> zoneList,
			Optional<RSDFile> dataFile,
			Optional<RSDBlob> dataBlob) {
		var b = _factory.builder(UploadMixedResult.DataBuilder.class);
		text.ifPresent(b::text);
		number.ifPresent(b::number);
		rec.ifPresent(b::rec);
		zone.ifPresent(b::_scalar);
		textList.map(l -> l.isEmpty() ? null : l).ifPresent(b::textList);
		numberList.map(l -> l.isEmpty() ? null : l).ifPresent(b::numberList);
		recList.map(l -> l.isEmpty() ? null : l).ifPresent(b::recList);
		zoneList.map(l -> l.isEmpty() ? null : l).ifPresent(b::scalarList);
		dataFile.map(c -> StreamUtils.streamToString(c.stream())).ifPresent(b::dataFileContent);
		dataBlob.map(c -> StreamUtils.streamToString(c.stream())).ifPresent(b::dataBlobContent);
		return b.build();
	}

}
