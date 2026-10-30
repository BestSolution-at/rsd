package dev.rsdlang;

import org.apache.avro.generic.GenericContainer;
import org.apache.avro.io.EncoderFactory;
import org.apache.avro.specific.SpecificDatumWriter;

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
import java.util.function.Supplier;

import dev.rsdlang.sample.avro.NULL;
import dev.rsdlang.sample.avro.PatchableUnionAPatch;
import dev.rsdlang.sample.avro.PatchableUnionBPatch;
import dev.rsdlang.sample.avro.SimpleRecord;
import dev.rsdlang.sample.avro.SimpleRecord_KeyVersion;
import dev.rsdlang.sample.avro.SimpleRecord_KeyVersion_Int_Int;
import dev.rsdlang.sample.avro.TreeNode;
import dev.rsdlang.sample.avro.UnionA;
import dev.rsdlang.sample.avro.UnionB;
import dev.rsdlang.sample.avro.SimpleRecord_Basic;
import dev.rsdlang.sample.avro.SimpleRecord_Basic_Optional;
import dev.rsdlang.sample.avro.SimpleRecord_Basic_Optional_Null;
import dev.rsdlang.sample.avro.SimpleRecord_Basic_Null;
import dev.rsdlang.sample.avro.ScalarRecord;
import dev.rsdlang.sample.avro.ScalarRecord_Substitution;
import dev.rsdlang.sample.avro.SimpleRecord_Basic_List;
import dev.rsdlang.sample.avro.SimpleRecord_Basic_List_Optional;
import dev.rsdlang.sample.avro.SimpleRecord_Basic_List_Optional_Null;
import dev.rsdlang.sample.avro.SimpleRecord_Basic_List_Null;
import dev.rsdlang.sample.avro.RecordWithUnions;
import dev.rsdlang.sample.avro.RecordOfRecords;
import dev.rsdlang.sample.avro.PatchableScalarRecordPatch;
import dev.rsdlang.sample.avro.PatchableScalarRecord_SubstitutionPatch;
import dev.rsdlang.sample.avro.PatchableScalarRecord_Substitution_listPatchMerge;
import dev.rsdlang.sample.avro.PatchableScalarRecord_Substitution_listPatchReplace;
import dev.rsdlang.sample.avro.PatchableScalarRecord_Substitution_list_NullPatchMerge;
import dev.rsdlang.sample.avro.PatchableScalarRecord_Substitution_list_NullPatchReplace;
import dev.rsdlang.sample.avro.PatchableScalarRecord_Substitution_list_OptPatchMerge;
import dev.rsdlang.sample.avro.PatchableScalarRecord_Substitution_list_OptPatchReplace;
import dev.rsdlang.sample.avro.PatchableScalarRecord_Substitution_list_Opt_NullPatchMerge;
import dev.rsdlang.sample.avro.PatchableScalarRecord_Substitution_list_Opt_NullPatchReplace;
import dev.rsdlang.sample.avro.PatchableScalarRecord_listPatchMerge;
import dev.rsdlang.sample.avro.PatchableScalarRecord_listPatchReplace;
import dev.rsdlang.sample.avro.PatchableScalarRecord_list_NullPatchMerge;
import dev.rsdlang.sample.avro.PatchableScalarRecord_list_NullPatchReplace;
import dev.rsdlang.sample.avro.PatchableScalarRecord_list_OptPatchMerge;
import dev.rsdlang.sample.avro.PatchableScalarRecord_list_OptPatchReplace;
import dev.rsdlang.sample.avro.PatchableScalarRecord_list_Opt_NullPatchMerge;
import dev.rsdlang.sample.avro.PatchableScalarRecord_list_Opt_NullPatchReplace;
import dev.rsdlang.sample.avro.PatchableUnionA;
import dev.rsdlang.sample.avro.PatchableRecordWithUnionPatch;
import dev.rsdlang.sample.avro.PatchableRecordWithUnion_listPatchMerge;
import dev.rsdlang.sample.avro.PatchableRecordWithUnion_listPatchReplace;
import dev.rsdlang.sample.avro.PatchableRecordWithUnion_list_NullPatchMerge;
import dev.rsdlang.sample.avro.PatchableRecordWithUnion_list_NullPatchReplace;
import dev.rsdlang.sample.avro.PatchableRecordWithUnion_list_OptPatchMerge;
import dev.rsdlang.sample.avro.PatchableRecordWithUnion_list_OptPatchReplace;
import dev.rsdlang.sample.avro.PatchableRecordWithUnion_list_Opt_NullPatchMerge;
import dev.rsdlang.sample.avro.PatchableRecordWithUnion_list_Opt_NullPatchReplace;
import dev.rsdlang.sample.avro.PatchableRecord_Basic;
import dev.rsdlang.sample.avro.PatchableRecord_BasicPatch;
import dev.rsdlang.sample.avro.PatchableRecordOfRecordsPatch;
import dev.rsdlang.sample.avro.PatchableRecordOfRecords_listPatchMerge;
import dev.rsdlang.sample.avro.PatchableRecordOfRecords_listPatchReplace;
import dev.rsdlang.sample.avro.PatchableRecordOfRecords_list_NullPatchMerge;
import dev.rsdlang.sample.avro.PatchableRecordOfRecords_list_NullPatchReplace;
import dev.rsdlang.sample.avro.PatchableRecordOfRecords_list_OptPatchMerge;
import dev.rsdlang.sample.avro.PatchableRecordOfRecords_list_OptPatchReplace;
import dev.rsdlang.sample.avro.PatchableRecordOfRecords_list_Opt_NullPatchMerge;
import dev.rsdlang.sample.avro.PatchableRecordOfRecords_list_Opt_NullPatchReplace;

public class GenerateTestFiles {
	private static final Path CLIENT_BASE_PATH = Path.of(
			"/Users/tomschindl/git-beso/rsd/dsl/java-test/java-client/src/test/resources/dev/rsdlang/sample/client/model");

	public static void main(String[] args) {
		Union();

		TreeNode();

		SimpleRecord();
		SimpleRecord_KeyVersion_Int_Int();
		SimpleRecord_KeyVersion();

		SimpleRecord_Basic();
		SimpleRecord_Basic_Optional();
		SimpleRecord_Basic_Null();
		SimpleRecord_Basic_Optional_Null();

		SimpleRecord_Basic_List();
		SimpleRecord_Basic_List_Optional();
		SimpleRecord_Basic_List_Null();
		SimpleRecord_Basic_List_Optional_Null();

		ScalarRecord();
		ScalarRecord_Substitution();

		SampleEnum();
		RecordWithUnions();
		RecordOfRecords();

		PatchableUnion();
		PatchableScalarRecordPatch();
		PatchableScalarRecord_SubstitutionPatch();
		PatchableRecordWithUnionPatch();
		PatchableRecordOfRecordsPatch();
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

	private static void SimpleRecord_Basic_List() {
		var record = new SimpleRecord_Basic_List();
		record.setValueBoolean(List.of(true, false));
		record.setValueDouble(List.of(Double.MIN_VALUE, Double.MAX_VALUE));
		record.setValueFloat(List.of(Float.MIN_VALUE, Float.MAX_VALUE));
		record.setValueInt(List.of(Integer.MIN_VALUE, Integer.MAX_VALUE));
		record.setValueLocalDate(List.of(
				LocalDate.parse("2020-01-01").toString(),
				LocalDate.parse("2020-12-31").toString()));
		record.setValueLocalDateTime(List.of(
				LocalDateTime.parse("2020-01-01T00:00:00").toString(), LocalDateTime.parse("2020-12-31T00:00:00").toString()));
		record.setValueLocalTime(List.of(
				LocalTime.parse("00:00:00").toString(),
				LocalTime.parse("23:59:59").toString()));
		record.setValueLong(List.of(Long.MIN_VALUE, Long.MAX_VALUE));
		record.setValueOffsetDateTime(List.of(
				OffsetDateTime.parse("2020-01-01T00:00:00+01:00").toString(),
				OffsetDateTime.parse("2020-12-31T00:00:00+01:00").toString()));
		record.setValueShort(List.of(
				(int) Short.MIN_VALUE,
				(int) Short.MAX_VALUE));
		record.setValueString(List.of("a", "b"));
		record.setValueZonedDateTime(List.of(
				ZonedDateTime.parse("2020-01-01T00:00:00+01:00[Europe/Paris]").toString(),
				ZonedDateTime.parse("2020-12-31T00:00:00+01:00[Europe/Paris]").toString()));
		persist(record, CLIENT_BASE_PATH.resolve("SimpleRecord_Basic_List.Data.avro"));
	}

	private static void SimpleRecord_Basic_List_Optional() {
		{
			var record = new SimpleRecord_Basic_List_Optional();
			record.setValueBoolean(List.of(true, false));
			record.setValueDouble(List.of(Double.MIN_VALUE, Double.MAX_VALUE));
			record.setValueFloat(List.of(Float.MIN_VALUE, Float.MAX_VALUE));
			record.setValueInt(List.of(Integer.MIN_VALUE, Integer.MAX_VALUE));
			record.setValueLocalDate(List.of(
					LocalDate.parse("2020-01-01").toString(),
					LocalDate.parse("2020-12-31").toString()));
			record.setValueLocalDateTime(List.of(
					LocalDateTime.parse("2020-01-01T00:00:00").toString(),
					LocalDateTime.parse("2020-12-31T00:00:00").toString()));
			record.setValueLocalTime(List.of(
					LocalTime.parse("00:00:00").toString(),
					LocalTime.parse("23:59:59").toString()));
			record.setValueLong(List.of(Long.MIN_VALUE, Long.MAX_VALUE));
			record.setValueOffsetDateTime(List.of(
					OffsetDateTime.parse("2020-01-01T00:00:00+01:00").toString(),
					OffsetDateTime.parse("2020-12-31T00:00:00+01:00").toString()));
			record.setValueShort(List.of(
					(int) Short.MIN_VALUE,
					(int) Short.MAX_VALUE));
			record.setValueString(List.of("a", "b"));
			record.setValueZonedDateTime(List.of(
					ZonedDateTime.parse("2020-01-01T00:00:00+01:00[Europe/Paris]").toString(),
					ZonedDateTime.parse("2020-12-31T00:00:00+01:00[Europe/Paris]").toString()));
			persist(record, CLIENT_BASE_PATH.resolve("SimpleRecord_Basic_List_Optional.Data.avro"));
		}
		persist(new SimpleRecord_Basic_List_Optional(),
				CLIENT_BASE_PATH.resolve("SimpleRecord_Basic_List_Optional.Empty.Data.avro"));
	}

	private static void SimpleRecord_Basic_List_Null() {
		{
			var record = new SimpleRecord_Basic_List_Null();
			record.setValueBoolean(List.of(true, false));
			record.setValueDouble(List.of(Double.MIN_VALUE, Double.MAX_VALUE));
			record.setValueFloat(List.of(Float.MIN_VALUE, Float.MAX_VALUE));
			record.setValueInt(List.of(Integer.MIN_VALUE, Integer.MAX_VALUE));
			record.setValueLocalDate(List.of(
					LocalDate.parse("2020-01-01").toString(),
					LocalDate.parse("2020-12-31").toString()));
			record.setValueLocalDateTime(List.of(
					LocalDateTime.parse("2020-01-01T00:00:00").toString(),
					LocalDateTime.parse("2020-12-31T00:00:00").toString()));
			record.setValueLocalTime(List.of(
					LocalTime.parse("00:00:00").toString(),
					LocalTime.parse("23:59:59").toString()));
			record.setValueLong(List.of(Long.MIN_VALUE, Long.MAX_VALUE));
			record.setValueOffsetDateTime(List.of(
					OffsetDateTime.parse("2020-01-01T00:00:00+01:00").toString(),
					OffsetDateTime.parse("2020-12-31T00:00:00+01:00").toString()));
			record.setValueShort(List.of(
					(int) Short.MIN_VALUE,
					(int) Short.MAX_VALUE));
			record.setValueString(List.of("a", "b"));
			record.setValueZonedDateTime(List.of(
					ZonedDateTime.parse("2020-01-01T00:00:00+01:00[Europe/Paris]").toString(),
					ZonedDateTime.parse("2020-12-31T00:00:00+01:00[Europe/Paris]").toString()));
			persist(record,
					CLIENT_BASE_PATH.resolve("SimpleRecord_Basic_List_Null.Data.avro"));
		}
		{
			var record = new SimpleRecord_Basic_List_Null();
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
			persist(record,
					CLIENT_BASE_PATH.resolve("SimpleRecord_Basic_List_Null.Null.Data.avro"));
		}
	}

	private static void SimpleRecord_Basic_List_Optional_Null() {
		{
			var record = new SimpleRecord_Basic_List_Optional_Null();
			record.setValueBoolean(List.of(true, false));
			record.setValueDouble(List.of(Double.MIN_VALUE, Double.MAX_VALUE));
			record.setValueFloat(List.of(Float.MIN_VALUE, Float.MAX_VALUE));
			record.setValueInt(List.of(Integer.MIN_VALUE, Integer.MAX_VALUE));
			record.setValueLocalDate(List.of(
					LocalDate.parse("2020-01-01").toString(),
					LocalDate.parse("2020-12-31").toString()));
			record.setValueLocalDateTime(List.of(
					LocalDateTime.parse("2020-01-01T00:00:00").toString(),
					LocalDateTime.parse("2020-12-31T00:00:00").toString()));
			record.setValueLocalTime(List.of(
					LocalTime.parse("00:00:00").toString(),
					LocalTime.parse("23:59:59").toString()));
			record.setValueLong(List.of(Long.MIN_VALUE, Long.MAX_VALUE));
			record.setValueOffsetDateTime(List.of(
					OffsetDateTime.parse("2020-01-01T00:00:00+01:00").toString(),
					OffsetDateTime.parse("2020-12-31T00:00:00+01:00").toString()));
			record.setValueShort(List.of(
					(int) Short.MIN_VALUE,
					(int) Short.MAX_VALUE));
			record.setValueString(List.of("a", "b"));
			record.setValueZonedDateTime(List.of(
					ZonedDateTime.parse("2020-01-01T00:00:00+01:00[Europe/Paris]").toString(),
					ZonedDateTime.parse("2020-12-31T00:00:00+01:00[Europe/Paris]").toString()));
			persist(record, CLIENT_BASE_PATH.resolve("SimpleRecord_Basic_List_Optional_Null.Data.avro"));
		}
		{
			persist(new SimpleRecord_Basic_List_Optional_Null(),
					CLIENT_BASE_PATH.resolve("SimpleRecord_Basic_List_Optional_Null.Empty.Data.avro"));
		}
		{
			var record = new SimpleRecord_Basic_List_Optional_Null();
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
			persist(record, CLIENT_BASE_PATH.resolve("SimpleRecord_Basic_List_Optional_Null.Null.Data.avro"));
		}
	}

	private static void TreeNode() {
		var record = new TreeNode();
		record.setValue("Root");

		var childA = new TreeNode();
		childA.setValue("Child A");
		childA.setChildren(List.of());

		var childB = new TreeNode();
		childB.setValue("Child B");
		childB.setChildren(List.of());

		record.setChildren(List.of(childA, childB));

		persist(record, CLIENT_BASE_PATH.resolve("TreeNode.Data.avro"));
	}

	private static void Union() {
		{
			var record = new UnionA();
			record.setValueA("A");
			record.setShared("Shared of A");
			persist(record, CLIENT_BASE_PATH.resolve("UnionA.Data.avro"));
		}
		{
			var record = new UnionB();
			record.setValueB("B");
			record.setShared("Shared of B");
			persist(record, CLIENT_BASE_PATH.resolve("UnionB.Data.avro"));
		}

	}

	private static void SampleEnum() {
		persist(dev.rsdlang.sample.avro.SampleEnum.A, CLIENT_BASE_PATH.resolve("SampleEnum.A.avro"));
		persist(dev.rsdlang.sample.avro.SampleEnum.B, CLIENT_BASE_PATH.resolve("SampleEnum.B.avro"));
	}

	private static void RecordWithUnions() {
		{
			var record = new RecordWithUnions();

			{
				var union = new UnionA();
				union.setValueA("A");
				union.setShared("Shared of A");
				record.setValue(union);
			}

			{
				var unionB = new UnionB();
				unionB.setValueB("B");
				unionB.setShared("Shared of B");
				record.setValueNull(unionB);
			}

			{
				var union = new UnionA();
				union.setValueA("A");
				union.setShared("Shared of A");
				record.setValueOpt(union);
			}

			{
				var unionB = new UnionB();
				unionB.setValueB("B");
				unionB.setShared("Shared of B");
				record.setValueOptNull(unionB);
			}

			{
				var unionA = new UnionA();
				unionA.setValueA("A");
				unionA.setShared("Shared of A");

				var unionB = new UnionB();
				unionB.setValueB("B");
				unionB.setShared("Shared of B");

				record.setList(List.of(unionA, unionB));
			}

			{
				var unionA = new UnionA();
				unionA.setValueA("A");
				unionA.setShared("Shared of A");

				var unionB = new UnionB();
				unionB.setValueB("B");
				unionB.setShared("Shared of B");

				record.setListNull(List.of(unionA, unionB));
			}

			{
				var unionA = new UnionA();
				unionA.setValueA("A");
				unionA.setShared("Shared of A");

				var unionB = new UnionB();
				unionB.setValueB("B");
				unionB.setShared("Shared of B");

				record.setListOpt(List.of(unionA, unionB));
			}

			{
				var unionA = new UnionA();
				unionA.setValueA("A");
				unionA.setShared("Shared of A");

				var unionB = new UnionB();
				unionB.setValueB("B");
				unionB.setShared("Shared of B");

				record.setListOptNull(List.of(unionA, unionB));
			}
			persist(record, CLIENT_BASE_PATH.resolve("RecordWithUnions.Data.avro"));
		}

		{
			var record = new RecordWithUnions();
			{
				var union = new UnionA();
				union.setValueA("A");
				union.setShared("Shared of A");
				record.setValue(union);
			}
			record.setValueNull(NULL.NULL);
			record.setValueOpt(null);
			record.setValueOptNull(NULL.NULL);

			{
				var unionA = new UnionA();
				unionA.setValueA("A");
				unionA.setShared("Shared of A");

				var unionB = new UnionB();
				unionB.setValueB("B");
				unionB.setShared("Shared of B");

				record.setList(List.of(unionA, unionB));
			}
			record.setListNull(NULL.NULL);
			record.setListOpt(null);
			record.setListOptNull(NULL.NULL);

			persist(record, CLIENT_BASE_PATH.resolve("RecordWithUnions.Null.Data.avro"));
		}

		{
			var record = new RecordWithUnions();
			{
				var union = new UnionA();
				union.setValueA("A");
				union.setShared("Shared of A");
				record.setValue(union);
			}
			record.setValueNull(NULL.NULL);
			record.setValueOpt(null);
			record.setValueOptNull(null);

			{
				var unionA = new UnionA();
				unionA.setValueA("A");
				unionA.setShared("Shared of A");

				var unionB = new UnionB();
				unionB.setValueB("B");
				unionB.setShared("Shared of B");

				record.setList(List.of(unionA, unionB));
			}
			record.setListNull(NULL.NULL);
			record.setListOpt(null);
			record.setListOptNull(null);

			persist(record, CLIENT_BASE_PATH.resolve("RecordWithUnions.Minimal.Data.avro"));
		}
	}

	private static void RecordOfRecords() {
		Supplier<SimpleRecord_Basic> supplier = () -> {
			var v = new SimpleRecord_Basic();
			v.setValueBoolean(true);
			v.setValueDouble(1.0);
			v.setValueFloat(1.0f);
			v.setValueInt(1);
			v.setValueLocalDate(LocalDate.parse("2020-01-01").toString());
			v.setValueLocalDateTime(LocalDateTime.parse("2020-01-01T10:00:00").toString());
			v.setValueLocalTime(LocalTime.parse("10:00").toString());
			v.setValueLong(1);
			v.setValueOffsetDateTime(OffsetDateTime.parse("2020-01-01T00:00:00+01:00").toString());
			v.setValueShort(1);
			v.setValueString("Hello");
			v.setValueZonedDateTime(ZonedDateTime.parse("2020-12-31T00:00:00+01:00[Europe/Paris]").toString());
			return v;
		};

		{
			var record = new RecordOfRecords();
			record.setValue(supplier.get());
			record.setValueNull(supplier.get());
			record.setValueOpt(supplier.get());
			record.setValueOptNull(supplier.get());
			record.setList(List.of(supplier.get()));
			record.setListNull(List.of(supplier.get()));
			record.setListOpt(List.of(supplier.get()));
			record.setListOptNull(List.of(supplier.get()));
			persist(record, CLIENT_BASE_PATH.resolve("RecordOfRecords.Data.avro"));
		}
		{
			var record = new RecordOfRecords();
			record.setValue(supplier.get());
			record.setValueNull(NULL.NULL);
			record.setValueOpt(null);
			record.setValueOptNull(NULL.NULL);
			record.setList(List.of(supplier.get()));
			record.setListNull(NULL.NULL);
			record.setListOpt(null);
			record.setListOptNull(NULL.NULL);
			persist(record, CLIENT_BASE_PATH.resolve("RecordOfRecords.Null.Data.avro"));
		}
		{
			var record = new RecordOfRecords();
			record.setValue(supplier.get());
			record.setValueNull(NULL.NULL);
			record.setValueOpt(null);
			record.setValueOptNull(null);
			record.setList(List.of(supplier.get()));
			record.setListNull(NULL.NULL);
			record.setListOpt(null);
			record.setListOptNull(null);
			persist(record, CLIENT_BASE_PATH.resolve("RecordOfRecords.Minimal.Data.avro"));
		}
	}

	private static void PatchableUnion() {
		{
			var record = new PatchableUnionAPatch();
			record.setKey("a-key");
			record.setVersion("a-version");
			record.setValueA("value-a");
			record.setShared("shared-a");
			persist(record, CLIENT_BASE_PATH.resolve("PatchableUnionA.Patch.avro"));
		}

		{
			var record = new PatchableUnionAPatch();
			record.setKey("a-key");
			record.setVersion("a-version");
			persist(record, CLIENT_BASE_PATH.resolve("PatchableUnionA.Minimal.Patch.avro"));
		}

		{
			var record = new PatchableUnionBPatch();
			record.setKey("b-key");
			record.setVersion("b-version");
			record.setValueB("value-b");
			record.setShared("shared-b");
			persist(record, CLIENT_BASE_PATH.resolve("PatchableUnionB.Patch.avro"));
		}
		{
			var record = new PatchableUnionBPatch();
			record.setKey("b-key");
			record.setVersion("b-version");
			persist(record, CLIENT_BASE_PATH.resolve("PatchableUnionB.Minimal.Patch.avro"));
		}
	}

	private static void PatchableScalarRecordPatch() {
		{
			var record = new PatchableScalarRecordPatch();
			record.setKey("k-1");
			record.setVersion("v-1");

			record.setValue("Europe/Paris");
			record.setValueNull("Europe/Paris");
			record.setValueOpt("Europe/Paris");
			record.setValueOptNull("Europe/Paris");

			record.setList(new PatchableScalarRecord_listPatchReplace(List.of("Europe/Paris")));
			record.setListNull(new PatchableScalarRecord_list_NullPatchReplace(List.of("Europe/Paris")));
			record.setListOpt(new PatchableScalarRecord_list_OptPatchReplace(List.of("Europe/Paris")));
			record.setListOptNull(new PatchableScalarRecord_list_Opt_NullPatchReplace(List.of("Europe/Paris")));
			persist(record, CLIENT_BASE_PATH.resolve("PatchableScalarRecord.ListReplace.Patch.avro"));
		}
		{
			var record = new PatchableScalarRecordPatch();
			record.setKey("k-1");
			record.setVersion("v-1");

			record.setValue("Europe/Paris");
			record.setValueNull("Europe/Paris");
			record.setValueOpt("Europe/Paris");
			record.setValueOptNull("Europe/Paris");

			record.setList(new PatchableScalarRecord_listPatchMerge(List.of("Europe/Paris"), List.of("Europe/Vienna")));
			record.setListNull(
					new PatchableScalarRecord_list_NullPatchMerge(List.of("Europe/Paris"), List.of("Europe/Vienna")));
			record
					.setListOpt(new PatchableScalarRecord_list_OptPatchMerge(List.of("Europe/Paris"), List.of("Europe/Vienna")));
			record.setListOptNull(
					new PatchableScalarRecord_list_Opt_NullPatchMerge(List.of("Europe/Paris"), List.of("Europe/Vienna")));
			persist(record, CLIENT_BASE_PATH.resolve("PatchableScalarRecord.ListMerge.Patch.avro"));
		}
		{
			var record = new PatchableScalarRecordPatch();
			record.setKey("k-1");
			record.setVersion("v-1");
			persist(record, CLIENT_BASE_PATH.resolve("PatchableScalarRecord.Minimal.Patch.avro"));
		}

		{
			var record = new PatchableScalarRecordPatch();
			record.setKey("k-1");
			record.setVersion("v-1");
			record.setValueNull(NULL.NULL);
			record.setValueOpt(NULL.NULL);
			record.setValueOptNull(NULL.NULL);
			record.setListNull(NULL.NULL);
			record.setListOpt(NULL.NULL);
			record.setListOptNull(NULL.NULL);
			persist(record,
					CLIENT_BASE_PATH.resolve("PatchableScalarRecord.Null.Patch.avro"));
		}
	}

	private static void PatchableScalarRecord_SubstitutionPatch() {
		{
			var record = new PatchableScalarRecord_SubstitutionPatch();
			record.setKey("k-1");
			record.setVersion("v-1");
			record.setValue("[0,1]");
			record.setValueNull("[0,1]");
			record.setValueOpt("[0,1]");
			record.setValueOptNull("[0,1]");
			record.setList(new PatchableScalarRecord_Substitution_listPatchReplace(List.of("[0,1]")));
			record.setListNull(new PatchableScalarRecord_Substitution_list_NullPatchReplace(List.of("[0,1]")));
			record.setListOpt(new PatchableScalarRecord_Substitution_list_OptPatchReplace(List.of("[0,1]")));
			record.setListOptNull(new PatchableScalarRecord_Substitution_list_Opt_NullPatchReplace(List.of("[0,1]")));
			persist(record, CLIENT_BASE_PATH.resolve("PatchableScalarRecord_Substitution.ListReplace.Patch.avro"));
		}
		{
			var record = new PatchableScalarRecord_SubstitutionPatch();
			record.setKey("k-1");
			record.setVersion("v-1");
			record.setValue("[0,1]");
			record.setValueNull("[0,1]");
			record.setValueOpt("[0,1]");
			record.setValueOptNull("[0,1]");
			record.setList(new PatchableScalarRecord_Substitution_listPatchMerge(List.of("[0,1]"), List.of("[1,2]")));
			record
					.setListNull(new PatchableScalarRecord_Substitution_list_NullPatchMerge(List.of("[0,1]"), List.of("[1,2]")));
			record.setListOpt(new PatchableScalarRecord_Substitution_list_OptPatchMerge(List.of("[0,1]"), List.of("[1,2]")));
			record.setListOptNull(
					new PatchableScalarRecord_Substitution_list_Opt_NullPatchMerge(List.of("[0,1]"), List.of("[1,2]")));
			persist(record, CLIENT_BASE_PATH.resolve("PatchableScalarRecord_Substitution.ListMerge.Patch.avro"));
		}

		{
			var record = new PatchableScalarRecord_SubstitutionPatch();
			record.setKey("k-1");
			record.setVersion("v-1");
			persist(record, CLIENT_BASE_PATH.resolve("PatchableScalarRecord_Substitution.Minimal.Patch.avro"));
		}

		{
			var record = new PatchableScalarRecord_SubstitutionPatch();
			record.setKey("k-1");
			record.setVersion("v-1");
			record.setValueNull(NULL.NULL);
			record.setValueOpt(NULL.NULL);
			record.setValueOptNull(NULL.NULL);
			record.setListNull(NULL.NULL);
			record.setListOpt(NULL.NULL);
			record.setListOptNull(NULL.NULL);
			persist(record, CLIENT_BASE_PATH.resolve("PatchableScalarRecord_Substitution.Null.Patch.avro"));
		}
	}

	private static void PatchableRecordWithUnionPatch() {
		{
			var record = new PatchableRecordWithUnionPatch();
			record.setKey("k-1");
			record.setVersion("v-1");
			record.setValue(new PatchableUnionA("data-a", "v-1", "shared-a", "value-a"));
			record.setValueNull(new PatchableUnionA("data-a", "v-1", "shared-a", "value-a"));
			record.setValueOpt(new PatchableUnionA("data-a", "v-1", "shared-a", "value-a"));
			record.setValueOptNull(new PatchableUnionA("data-a", "v-1", "shared-a", "value-a"));
			record.setList(new PatchableRecordWithUnion_listPatchReplace(
					List.of(new PatchableUnionA("data-a", "v-1", "shared-a", "value-a"))));
			record.setListNull(new PatchableRecordWithUnion_list_NullPatchReplace(
					List.of(new PatchableUnionA("data-a", "v-1", "shared-a", "value-a"))));
			record.setListOpt(new PatchableRecordWithUnion_list_OptPatchReplace(
					List.of(new PatchableUnionA("data-a", "v-1", "shared-a", "value-a"))));
			record.setListOptNull(new PatchableRecordWithUnion_list_Opt_NullPatchReplace(
					List.of(new PatchableUnionA("data-a", "v-1", "shared-a", "value-a"))));
			persist(record, CLIENT_BASE_PATH.resolve("PatchableRecordWithUnion.ListReplace.Patch.avro"));
		}

		{
			var record = new PatchableRecordWithUnionPatch();
			record.setKey("k-1");
			record.setVersion("v-1");
			record.setValue(new PatchableUnionBPatch("patch-b", "v-1", "shared-b", null));
			record.setValueNull(new PatchableUnionBPatch("patch-b", "v-1", "shared-b", null));
			record.setValueOpt(new PatchableUnionBPatch("patch-b", "v-1", "shared-b", null));
			record.setValueOptNull(new PatchableUnionBPatch("patch-b", "v-1", "shared-b", null));

			record.setList(
					new PatchableRecordWithUnion_listPatchMerge(
							List.of(new PatchableUnionA("data-a", "v-1", "shared-a", "value-a")),
							List.of(new PatchableUnionBPatch("patch-b", "v-1", null, null)),
							List.of("k-1:v1")));

			record.setListNull(
					new PatchableRecordWithUnion_list_NullPatchMerge(
							List.of(new PatchableUnionA("data-a", "v-1", "shared-a", "value-a")),
							List.of(new PatchableUnionBPatch("patch-b", "v-1", null, null)),
							List.of("k-1:v1")));

			record.setListOpt(
					new PatchableRecordWithUnion_list_OptPatchMerge(
							List.of(new PatchableUnionA("data-a", "v-1", "shared-a", "value-a")),
							List.of(new PatchableUnionBPatch("patch-b", "v-1", null, null)),
							List.of("k-1:v1")));
			record.setListOptNull(
					new PatchableRecordWithUnion_list_Opt_NullPatchMerge(
							List.of(new PatchableUnionA("data-a", "v-1", "shared-a", "value-a")),
							List.of(new PatchableUnionBPatch("patch-b", "v-1", null, null)),
							List.of("k-1:v1")));
			persist(record, CLIENT_BASE_PATH.resolve("PatchableRecordWithUnion.ListMerge.Patch.avro"));
		}

		{
			var record = new PatchableRecordWithUnionPatch();
			record.setKey("k-1");
			record.setVersion("v-1");
			persist(record, CLIENT_BASE_PATH.resolve("PatchableRecordWithUnion.Minimal.Patch.avro"));
		}

		{
			var record = new PatchableRecordWithUnionPatch();
			record.setKey("k-1");
			record.setVersion("v-1");
			record.setValueNull(NULL.NULL);
			record.setValueOpt(NULL.NULL);
			record.setValueOptNull(NULL.NULL);
			record.setListNull(NULL.NULL);
			record.setListOpt(NULL.NULL);
			record.setListOptNull(NULL.NULL);
			persist(record, CLIENT_BASE_PATH.resolve("PatchableRecordWithUnion.Null.Patch.avro"));
		}
	}

	private static void PatchableRecordOfRecordsPatch() {
		{
			Supplier<PatchableRecord_Basic> valueGenerator = () -> new PatchableRecord_Basic(
					"data-1",
					"v-1",
					true,
					1,
					1,
					1l,
					1.0f,
					1.0,
					"Value-1",
					"2020-01-01",
					"2020-01-01T00:00:00",
					"10:00:00",
					"2020-01-01T00:00:00+00:00",
					"2020-01-01T00:00:00+01:00[Europe/Paris]");
			var record = new PatchableRecordOfRecordsPatch();
			record.setKey("k-1");
			record.setVersion("v-1");
			record.setValue(valueGenerator.get());
			record.setValueNull(valueGenerator.get());
			record.setValueOpt(valueGenerator.get());
			record.setValueOptNull(valueGenerator.get());
			record.setList(new PatchableRecordOfRecords_listPatchReplace(List.of(valueGenerator.get())));
			record.setListNull(new PatchableRecordOfRecords_list_NullPatchReplace(List.of(valueGenerator.get())));
			record.setListOpt(new PatchableRecordOfRecords_list_OptPatchReplace(List.of(valueGenerator.get())));
			record.setListOptNull(new PatchableRecordOfRecords_list_Opt_NullPatchReplace(List.of(valueGenerator.get())));
			persist(record, CLIENT_BASE_PATH.resolve("PatchableRecordOfRecords.ListReplace.Patch.avro"));
		}

		{
			Supplier<PatchableRecord_Basic> valueGenerator = () -> new PatchableRecord_Basic(
					"data-1",
					"v-1",
					true,
					1,
					1,
					1l,
					1.0f,
					1.0, "Value-1",
					"2020-01-01",
					"2020-01-01T00:00:00",
					"10:00:00",
					"2020-01-01T00:00:00+00:00",
					"2020-01-01T00:00:00+01:00[Europe/Paris]");
			Supplier<PatchableRecord_BasicPatch> patchGenerator = () -> {
				var rv = new PatchableRecord_BasicPatch();
				rv.setKey("patch-k-1");
				rv.setVersion("patch-v-1");
				return rv;
			};

			var record = new PatchableRecordOfRecordsPatch();
			record.setKey("k-1");
			record.setVersion("v-1");
			record.setValue(patchGenerator.get());
			record.setValueNull(patchGenerator.get());
			record.setValueOpt(patchGenerator.get());
			record.setValueOptNull(patchGenerator.get());
			record.setList(new PatchableRecordOfRecords_listPatchMerge(
					List.of(valueGenerator.get()),
					List.of(patchGenerator.get()),
					List.of("k-1")));
			record.setListNull(new PatchableRecordOfRecords_list_NullPatchMerge(
					List.of(valueGenerator.get()),
					List.of(patchGenerator.get()),
					List.of("k-1")));
			record.setListOpt(new PatchableRecordOfRecords_list_OptPatchMerge(
					List.of(valueGenerator.get()),
					List.of(patchGenerator.get()),
					List.of("k-1")));
			record.setListOptNull(new PatchableRecordOfRecords_list_Opt_NullPatchMerge(
					List.of(valueGenerator.get()),
					List.of(patchGenerator.get()),
					List.of("k-1")));
			persist(record, CLIENT_BASE_PATH.resolve("PatchableRecordOfRecords.ListMerge.Patch.avro"));
		}

		{
			var record = new PatchableRecordOfRecordsPatch();
			record.setKey("k-1");
			record.setVersion("v-1");
			persist(record, CLIENT_BASE_PATH.resolve("PatchableRecordOfRecords.Minimal.Patch.avro"));
		}

		{
			var record = new PatchableRecordOfRecordsPatch();
			record.setKey("k-1");
			record.setVersion("v-1");
			record.setValueNull(NULL.NULL);
			record.setValueOpt(NULL.NULL);
			record.setValueOptNull(NULL.NULL);
			record.setListNull(NULL.NULL);
			record.setListOpt(NULL.NULL);
			record.setListOptNull(NULL.NULL);
			persist(record, CLIENT_BASE_PATH.resolve("PatchableRecordOfRecords.Null.Patch.avro"));
		}
	}

	private static <T extends GenericContainer> void persist(T record, Path path) {
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
