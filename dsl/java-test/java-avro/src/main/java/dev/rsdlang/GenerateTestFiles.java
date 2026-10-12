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
import java.util.List;

import dev.rsdlang.sample.avro.NULL;
import dev.rsdlang.sample.avro.SimpleRecord;
import dev.rsdlang.sample.avro.SimpleRecord_KeyVersion;
import dev.rsdlang.sample.avro.SimpleRecord_KeyVersion_Int_Int;
import dev.rsdlang.sample.avro.SimpleRecord_Basic;
import dev.rsdlang.sample.avro.SimpleRecord_Basic_Optional;
import dev.rsdlang.sample.avro.SimpleRecord_Basic_Optional_Null;
import dev.rsdlang.sample.avro.SimpleRecord_Basic_Null;
import dev.rsdlang.sample.avro.ScalarRecord;
import dev.rsdlang.sample.avro.ScalarRecord_Substitution;

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
		ScalarRecord();
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

	private static void ScalarRecord() {
		{
			var record = new ScalarRecord();
			record.setValue("Europe/Paris");
			record.setValueNull("Europe/Paris");
			record.setValueOpt("Europe/Paris");
			record.setValueOptNull("Europe/Paris");
			record.setList(List.of("Europe/Paris", "America/Los_Angeles"));
			record.setListNull(List.of("Europe/Paris", "America/Los_Angeles"));
			record.setListOpt(List.of("Europe/Paris", "America/Los_Angeles"));
			record.setListOptNull(List.of("Europe/Paris", "America/Los_Angeles"));
			persist(record, CLIENT_BASE_PATH.resolve("ScalarRecord.Data.avro"));
		}

		{
			var record = new ScalarRecord();
			record.setValue("Europe/Paris");
			record.setValueNull(NULL.NULL);
			record.setValueOpt(null);
			record.setValueOptNull(NULL.NULL);
			record.setList(List.of("Europe/Paris", "America/Los_Angeles"));
			record.setListNull(NULL.NULL);
			record.setListOpt(null);
			record.setListOptNull(NULL.NULL);
			persist(record, CLIENT_BASE_PATH.resolve("ScalarRecord.Null.Data.avro"));
		}

		{
			var record = new ScalarRecord();
			record.setValue("Europe/Paris");
			record.setValueNull(NULL.NULL);
			record.setValueOpt(null);
			record.setValueOptNull(null);
			record.setList(List.of("Europe/Paris", "America/Los_Angeles"));
			record.setListNull(NULL.NULL);
			record.setListOpt(null);
			record.setListOptNull(null);
			persist(record, CLIENT_BASE_PATH.resolve("ScalarRecord.Minimal.Data.avro"));
		}
	}

	private static void ScalarRecord_Substitution() {
		{
			var record = new ScalarRecord_Substitution();
			record.setValue("[0,1]");
			record.setValueNull("[0,1]");
			record.setValueOpt("[0,1]");
			record.setValueOptNull("[0,1]");
			record.setList(List.of("[0,1]", "[1,2]"));
			record.setListNull(List.of("[0,1]", "[1,2]"));
			record.setListOpt(List.of("[0,1]", "[1,2]"));
			record.setListOptNull(List.of("[0,1]", "[1,2]"));
			persist(record, CLIENT_BASE_PATH.resolve("ScalarRecord_Substitution.Data.avro"));
		}

		{
			var record = new ScalarRecord_Substitution();
			record.setValue("[0,1]");
			record.setValueNull(NULL.NULL);
			record.setValueOpt(null);
			record.setValueOptNull(NULL.NULL);
			record.setList(List.of("[0,1]", "[1,2]"));
			record.setListNull(NULL.NULL);
			record.setListOpt(null);
			record.setListOptNull(NULL.NULL);
			persist(record, CLIENT_BASE_PATH.resolve("ScalarRecord_Substitution.Null.Data.avro"));
		}

		{
			var record = new ScalarRecord_Substitution();
			record.setValue("[0,1]");
			record.setValueNull(NULL.NULL);
			record.setValueOpt(null);
			record.setValueOptNull(null);
			record.setList(List.of("[0,1]", "[1,2]"));
			record.setListNull(NULL.NULL);
			record.setListOpt(null);
			record.setListOptNull(null);
			persist(record, CLIENT_BASE_PATH.resolve("ScalarRecord_Substitution.Minimal.Data.avro"));
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
