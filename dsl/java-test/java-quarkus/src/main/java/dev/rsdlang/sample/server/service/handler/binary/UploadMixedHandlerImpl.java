package dev.rsdlang.sample.server.service.handler.binary;

import java.time.Month;
import java.util.List;

import dev.rsdlang.sample.server.service.BuilderFactory;
import dev.rsdlang.sample.server.service.impl.BinaryTypesServiceImpl;
import dev.rsdlang.sample.server.DayOfWeek;
import dev.rsdlang.sample.server.model.RSDBlob;
import dev.rsdlang.sample.server.model.RSDFile;
import dev.rsdlang.sample.server.model.SimpleRecord;
import dev.rsdlang.sample.server.model.UploadMixedResult;
import dev.rsdlang.sample.server.model.ZoneId;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class UploadMixedHandlerImpl implements BinaryTypesServiceImpl.UploadMixedHandler {

	@Override
	public UploadMixedResult.Data uploadMixed(BuilderFactory _factory,
			String text,
			int number,
			SimpleRecord.Data rec,
			ZoneId zone,
			DayOfWeek dayOfWeek,
			List<String> textList,
			List<Integer> numberList,
			List<SimpleRecord.Data> recList,
			List<ZoneId> zoneList,
			List<Month> monthList,
			RSDFile dataFile,
			RSDBlob dataBlob) {
		return _factory.builder(UploadMixedResult.DataBuilder.class)
				.text(text)
				.number(number)
				.rec(rec)
				._scalar(zone)
				.dayOfWeek(dayOfWeek)
				.textList(textList)
				.numberList(numberList)
				.recList(recList)
				.scalarList(zoneList)
				.monthList(monthList)
				.dataFileContent(StreamUtils.streamToString(dataFile.stream()))
				.dataBlobContent(StreamUtils.streamToString(dataBlob.stream()))
				.build();
	}

}
