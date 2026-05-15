package dev.rsdlang.sample.server.service.handler.binary;

import jakarta.enterprise.context.ApplicationScoped;
import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BinaryTypesServiceImpl;
import dev.rsdlang.sample.server.service.model.MixedResult;
import dev.rsdlang.sample.server.service.model.RSDBlob;
import dev.rsdlang.sample.server.service.model.SimpleRecord.Data;

@ApplicationScoped
public class MixedHandlerImpl implements BinaryTypesServiceImpl.MixedHandler {

	@Override
	public MixedResult.Data mixed(BuilderFactory _factory,
			String pathString,
			int pathNumber,
			String headerString,
			int headerNumber,
			Data headerRecord,
			String queryString,
			int queryNumber,
			Data queryRecord,
			RSDBlob dataBlob) {
		return _factory.builder(MixedResult.DataBuilder.class)
				.pathString(pathString)
				.pathNumber(pathNumber)
				.headerString(headerString)
				.headerNumber(headerNumber)
				.headerRecord(headerRecord)
				.queryString(queryString)
				.queryNumber(queryNumber)
				.queryRecord(queryRecord)
				.dataBlob(StreamUtils.streamLength(dataBlob.stream()))
				.build();
	}

}
