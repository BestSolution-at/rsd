package dev.rsdlang.sample.client.model;

import static org.assertj.core.api.Assertions.assertThat;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZonedDateTime;

import org.assertj.core.api.AbstractObjectAssert;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;

import dev.rsdlang.sample.client.model.impl.avro._AvroSchema;
import dev.rsdlang.sample.client.model.impl.avro._AvroSchema.AvroTypes;

public class RecordOfRecords_DataTest extends BaseTest {
	private static final Object[] DEFAULT_DATA = new Object[] {
			true,
			1.0,
			1.0f,
			1,
			LocalDate.parse("2020-01-01"),
			LocalDateTime.parse("2020-01-01T10:00:00"),
			LocalTime.parse("10:00"),
			1L,
			"Hello",
			ZonedDateTime.parse("2020-12-31T00:00:00+01:00[Europe/Paris]")
	};

	private static void assertSimpleRecord_Basic(AbstractObjectAssert<?, SimpleRecord_Basic.Data> assertThat) {
		assertThat
				.isNotNull()
				.extracting(
						SimpleRecord_Basic.Data::valueBoolean,
						SimpleRecord_Basic.Data::valueDouble,
						SimpleRecord_Basic.Data::valueFloat,
						SimpleRecord_Basic.Data::valueInt,
						SimpleRecord_Basic.Data::valueLocalDate,
						SimpleRecord_Basic.Data::valueLocalDateTime,
						SimpleRecord_Basic.Data::valueLocalTime,
						SimpleRecord_Basic.Data::valueLong,
						SimpleRecord_Basic.Data::valueString,
						SimpleRecord_Basic.Data::valueZonedDateTime)
				.containsExactly(DEFAULT_DATA);
	}

	@Nested
	class Filled {
		static RecordOfRecords.Data createAvroRecord() {
			var schema = _AvroSchema.getInstance().getTypeSchema(AvroTypes.RecordOfRecords);
			var record = readAvroFile("RecordOfRecords.Data.avro", schema);
			return dev.rsdlang.sample.client.model.impl.avro.RecordOfRecordsDataImpl.of(record);
		}

		static RecordOfRecords.Data createJsonRecord() {
			var record = readJsonFile("RecordOfRecords.Data.json");
			return dev.rsdlang.sample.client.model.impl.json.RecordOfRecordsDataImpl.of(record);
		}

		static RecordOfRecords.Data[] getRecords() {
			return new RecordOfRecords.Data[] {
					createAvroRecord(),
					createJsonRecord()
			};
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void value(RecordOfRecords.Data record) {
			assertSimpleRecord_Basic(assertThat(record.value()));
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueNull(RecordOfRecords.Data record) {
			assertSimpleRecord_Basic(assertThat(record.value_Null()).isPresent().get());
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueOpt(RecordOfRecords.Data record) {
			assertSimpleRecord_Basic(assertThat(record.value_Opt()).isPresent().get());
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueOptNull(RecordOfRecords.Data record) {
			assertSimpleRecord_Basic(assertThat(record.value_Opt_Null().toOptional()).isPresent().get());
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list(RecordOfRecords.Data record) {
			var list = record.list();

			assertSimpleRecord_Basic(assertThat(list).isNotEmpty().singleElement());
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void listNull(RecordOfRecords.Data record) {
			var data = record.list_Null();

			var list = assertThat(data).isPresent().get().actual();
			assertSimpleRecord_Basic(assertThat(list).isNotEmpty().singleElement());

		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void listOpt(RecordOfRecords.Data record) {
			var data = record.list_Opt();

			var list = assertThat(data).isPresent().get().actual();
			assertSimpleRecord_Basic(assertThat(list).isNotEmpty().singleElement());
		}
	}

	@Nested
	class Minimal {
		static RecordOfRecords.Data createAvroRecord() {
			var schema = _AvroSchema.getInstance().getTypeSchema(AvroTypes.RecordOfRecords);
			var record = readAvroFile("RecordOfRecords.Minimal.Data.avro", schema);
			return dev.rsdlang.sample.client.model.impl.avro.RecordOfRecordsDataImpl.of(record);
		}

		static RecordOfRecords.Data createJsonRecord() {
			var record = readJsonFile("RecordOfRecords.Minimal.Data.json");
			return dev.rsdlang.sample.client.model.impl.json.RecordOfRecordsDataImpl.of(record);
		}

		static RecordOfRecords.Data[] getRecords() {
			return new RecordOfRecords.Data[] {
					createAvroRecord(),
					createJsonRecord()
			};
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void value(RecordOfRecords.Data record) {
			assertSimpleRecord_Basic(assertThat(record.value()));
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueNull(RecordOfRecords.Data record) {
			assertThat(record.value_Null()).isNotPresent();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueOpt(RecordOfRecords.Data record) {
			assertThat(record.value_Opt()).isNotPresent();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueOptNull(RecordOfRecords.Data record) {
			assertThat(record.value_Opt_Null().toOptional()).isNotPresent();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list(RecordOfRecords.Data record) {
			var list = record.list();

			assertSimpleRecord_Basic(assertThat(list).isNotEmpty().singleElement());
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void listNull(RecordOfRecords.Data record) {
			assertThat(record.list_Null()).isNotPresent();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void listOpt(RecordOfRecords.Data record) {
			assertThat(record.list_Opt()).isNotPresent();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void listOptNull(RecordOfRecords.Data record) {
			assertThat(record.list_Opt_Null().toOptional()).isNotPresent();
		}
	}

	@Nested
	class Null {
		static RecordOfRecords.Data createAvroRecord() {
			var schema = _AvroSchema.getInstance().getTypeSchema(AvroTypes.RecordOfRecords);
			var record = readAvroFile("RecordOfRecords.Null.Data.avro", schema);
			return dev.rsdlang.sample.client.model.impl.avro.RecordOfRecordsDataImpl.of(record);
		}

		static RecordOfRecords.Data createJsonRecord() {
			var record = readJsonFile("RecordOfRecords.Null.Data.json");
			return dev.rsdlang.sample.client.model.impl.json.RecordOfRecordsDataImpl.of(record);
		}

		static RecordOfRecords.Data[] getRecords() {
			return new RecordOfRecords.Data[] {
					createAvroRecord(),
					createJsonRecord()
			};
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void value(RecordOfRecords.Data record) {
			assertSimpleRecord_Basic(assertThat(record.value()));
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueNull(RecordOfRecords.Data record) {
			assertThat(record.value_Null()).isNotPresent();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueOpt(RecordOfRecords.Data record) {
			assertThat(record.value_Opt()).isNotPresent();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void valueOptNull(RecordOfRecords.Data record) {
			assertThat(record.value_Opt_Null().isNull()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void list(RecordOfRecords.Data record) {
			var list = record.list();

			assertSimpleRecord_Basic(assertThat(list).isNotEmpty().singleElement());
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void listOptNull(RecordOfRecords.Data record) {
			assertThat(record.list_Opt_Null().isNull()).isTrue();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void listOpt(RecordOfRecords.Data record) {
			assertThat(record.list_Opt()).isNotPresent();
		}

		@ParameterizedTest
		@MethodSource("getRecords")
		void listNull(RecordOfRecords.Data record) {
			assertThat(record.list_Null()).isNotPresent();
		}
	}
}
