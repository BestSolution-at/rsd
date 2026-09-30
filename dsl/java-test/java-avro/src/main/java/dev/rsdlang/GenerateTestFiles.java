package dev.rsdlang;

import org.apache.avro.io.EncoderFactory;
import org.apache.avro.specific.SpecificDatumWriter;
import org.apache.avro.specific.SpecificRecordBase;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.OffsetDateTime;
import java.time.ZonedDateTime;

import dev.rsdlang.sample.avro.NULL;
import dev.rsdlang.sample.avro.SimpleRecord;
import dev.rsdlang.sample.avro.SimpleRecord_KeyVersion;
import dev.rsdlang.sample.avro.SimpleRecord_KeyVersion_Int_Int;
import dev.rsdlang.sample.avro.SimpleRecord_Basic;
import dev.rsdlang.sample.avro.SimpleRecord_Basic_Optional;
import dev.rsdlang.sample.avro.SimpleRecord_Basic_Optional_Null;
import dev.rsdlang.sample.avro.SimpleRecord_Basic_Null;

public class GenerateTestFiles {
	private static final Path CLIENT_BASE_PATH = Path.of(
			"/Users/tomschindl/git-beso/rsd/dsl/java-test/java-client/src/test/resources/dev/rsdlang/sample/client/model");

	public static void main(String[] args) {
		SimpleRecord();
		SimpleRecord_KeyVersion_Int_Int();
		SimpleRecord_KeyVersion();

		SimpleRecord_Basic();
		SimpleRecord_Basic_Optional();
		SimpleRecord_Basic_Null();
		SimpleRecord_Basic_Optional_Null();
	}

	private static void SimpleRecord() {
		var record = new SimpleRecord();
		record.setKey("1");
		record.setVersion("1");
		record.setValue("the value");
		persist(record, CLIENT_BASE_PATH.resolve("SimpleRecord.Data.avro"));
	}

	private static void SimpleRecord_KeyVersion_Int_Int() {
		var record = new SimpleRecord_KeyVersion_Int_Int();
		record.setKey(1);
		record.setVersion(1);
		persist(record, CLIENT_BASE_PATH.resolve("SimpleRecord_KeyVersion_Int_Int.Data.avro"));
	}

	private static void SimpleRecord_KeyVersion() {
		var record = new SimpleRecord_KeyVersion();
		record.setKey("2");
		record.setVersion("2");
		persist(record, CLIENT_BASE_PATH.resolve("SimpleRecord_KeyVersion.Data.avro"));
	}

	private static void SimpleRecord_Basic() {
		var record = new SimpleRecord_Basic();
		record.setValueBoolean(false);
		record.setValueDouble(Double.MAX_VALUE);
		record.setValueFloat(Float.MAX_VALUE);
		record.setValueInt(Integer.MAX_VALUE);
		record.setValueLocalDate(LocalDate.parse("2020-01-01").toString());
		record.setValueLocalDateTime(LocalDateTime.parse("2020-01-01T00:00:00").toString());
		record.setValueLocalTime(LocalTime.parse("10:00").toString());
		record.setValueLong(Long.MAX_VALUE);
		record.setValueOffsetDateTime(OffsetDateTime.parse("2020-01-01T00:00:00+01:00").toString());
		record.setValueShort(Short.MAX_VALUE);
		record.setValueString("the string value");
		record.setValueZonedDateTime(ZonedDateTime.parse("2020-01-01T00:00:00+01:00[Europe/Paris]").toString());

		persist(record, CLIENT_BASE_PATH.resolve("SimpleRecord_Basic.Data.avro"));
	}

	private static void SimpleRecord_Basic_Optional() {
		var record = new SimpleRecord_Basic_Optional();
		record.setValueBoolean(false);
		record.setValueDouble(Double.MAX_VALUE);
		record.setValueFloat(Float.MAX_VALUE);
		record.setValueInt(Integer.MAX_VALUE);
		record.setValueLocalDate(LocalDate.parse("2020-01-01").toString());
		record.setValueLocalDateTime(LocalDateTime.parse("2020-01-01T00:00:00").toString());
		record.setValueLocalTime(LocalTime.parse("10:00").toString());
		record.setValueLong(Long.MAX_VALUE);
		record.setValueOffsetDateTime(OffsetDateTime.parse("2020-01-01T00:00:00+01:00").toString());
		record.setValueShort(Integer.valueOf(Short.MAX_VALUE));
		record.setValueString("the string value");
		record
				.setValueZonedDateTime(ZonedDateTime.parse("2020-01-01T00:00:00+01:00[Europe/Paris]").toString());

		persist(record, CLIENT_BASE_PATH.resolve("SimpleRecord_Basic_Optional.Data.avro"));
		persist(new SimpleRecord_Basic_Optional(), CLIENT_BASE_PATH.resolve("SimpleRecord_Basic_Optional.Empty.Data.avro"));
	}

	private static void SimpleRecord_Basic_Optional_Null() {
		{
			var record = new SimpleRecord_Basic_Optional_Null();
			record.setValueBoolean(false);
			record.setValueDouble(Double.MAX_VALUE);
			record.setValueFloat(Float.MAX_VALUE);
			record.setValueInt(Integer.MAX_VALUE);
			record.setValueLocalDate(LocalDate.parse("2020-01-01").toString());
			record.setValueLocalDateTime(LocalDateTime.parse("2020-01-01T00:00:00").toString());
			record.setValueLocalTime(LocalTime.parse("10:00").toString());
			record.setValueLong(Long.MAX_VALUE);
			record.setValueOffsetDateTime(OffsetDateTime.parse("2020-01-01T00:00:00+01:00").toString());
			record.setValueShort(Integer.valueOf(Short.MAX_VALUE));
			record.setValueString("the string value");
			record.setValueZonedDateTime(ZonedDateTime.parse("2020-01-01T00:00:00+01:00[Europe/Paris]").toString());

			persist(record, CLIENT_BASE_PATH.resolve("SimpleRecord_Basic_Optional_Null.Data.avro"));
		}
		{
			var record = new SimpleRecord_Basic_Optional_Null();
			record.setValueBoolean(NULL.NULL);
			record.setValueDouble(NULL.NULL);
			record.setValueFloat(NULL.NULL);
			record.setValueInt(NULL.NULL);
			record.setValueLocalDate(NULL.NULL);
			record.setValueLocalDateTime(NULL.NULL);
			record.setValueLocalTime(NULL.NULL);
			record.setValueLong(NULL.NULL);
			record.setValueOffsetDateTime(NULL.NULL);
			record.setValueShort(NULL.NULL);
			record.setValueString(NULL.NULL);
			record.setValueZonedDateTime(NULL.NULL);
			persist(record, CLIENT_BASE_PATH.resolve("SimpleRecord_Basic_Optional_Null.Null.Data.avro"));
		}
		persist(new SimpleRecord_Basic_Optional_Null(),
				CLIENT_BASE_PATH.resolve("SimpleRecord_Basic_Optional_Null.Empty.Data.avro"));
	}

	private static void SimpleRecord_Basic_Null() {
		{
			var record = new SimpleRecord_Basic_Null();
			record.setValueBoolean(false);
			record.setValueDouble(Double.MAX_VALUE);
			record.setValueFloat(Float.MAX_VALUE);
			record.setValueInt(Integer.MAX_VALUE);
			record.setValueLocalDate(LocalDate.parse("2020-01-01").toString());
			record.setValueLocalDateTime(LocalDateTime.parse("2020-01-01T00:00:00").toString());
			record.setValueLocalTime(LocalTime.parse("10:00").toString());
			record.setValueLong(Long.MAX_VALUE);
			record.setValueOffsetDateTime(OffsetDateTime.parse("2020-01-01T00:00:00+01:00").toString());
			record.setValueShort(Integer.valueOf(Short.MAX_VALUE));
			record.setValueString("the string value");
			record.setValueZonedDateTime(ZonedDateTime.parse("2020-01-01T00:00:00+01:00[Europe/Paris]").toString());
			persist(record, CLIENT_BASE_PATH.resolve("SimpleRecord_Basic_Null.Data.avro"));
		}
		{
			var record = new SimpleRecord_Basic_Null();
			record.setValueBoolean(NULL.NULL);
			record.setValueDouble(NULL.NULL);
			record.setValueFloat(NULL.NULL);
			record.setValueInt(NULL.NULL);
			record.setValueLocalDate(NULL.NULL);
			record.setValueLocalDateTime(NULL.NULL);
			record.setValueLocalTime(NULL.NULL);
			record.setValueLong(NULL.NULL);
			record.setValueOffsetDateTime(NULL.NULL);
			record.setValueShort(NULL.NULL);
			record.setValueString(NULL.NULL);
			record.setValueZonedDateTime(NULL.NULL);
			persist(record, CLIENT_BASE_PATH.resolve("SimpleRecord_Basic_Null.Null.Data.avro"));
		}
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
