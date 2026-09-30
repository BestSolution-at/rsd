package dev.rsdlang;

import org.apache.avro.file.DataFileWriter;
import org.apache.avro.io.DatumWriter;
import org.apache.avro.io.EncoderFactory;
import org.apache.avro.specific.SpecificDatumWriter;
import org.apache.avro.specific.SpecificRecordBase;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;

import dev.rsdlang.sample.avro.SimpleRecord;

public class GenerateTestFiles {
	private static final Path CLIENT_BASE_PATH = Path.of(
			"/Users/tomschindl/git-beso/rsd/dsl/java-test/java-client/src/test/resources/dev/rsdlang/sample/client/model/impl/avro/");

	public static void main(String[] args) {
		SimpleRecord();
	}

	private static void SimpleRecord() {
		SimpleRecord record = new SimpleRecord();
		record.setKey("1");
		record.setVersion("1");
		record.setValue("the value");
		persist(record, CLIENT_BASE_PATH.resolve("SimpleRecordDataImpl.avro"));
	}

	private static <T extends SpecificRecordBase> void persist(T record, Path path) {
		try (var outputStream = Files.newOutputStream(path, StandardOpenOption.CREATE,
				StandardOpenOption.TRUNCATE_EXISTING)) {
			var encoder = EncoderFactory.get().binaryEncoder(outputStream, null);
			var writer = new SpecificDatumWriter<T>(record.getSchema());
			writer.write(record, encoder);
			encoder.flush();
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}
}
