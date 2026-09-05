package at.bestsolution;

import java.io.IOException;
import java.nio.file.Path;

import dev.hardwood.InputFile;
import dev.hardwood.OutputFile;
import dev.hardwood.metadata.LogicalType;
import dev.hardwood.metadata.PhysicalType;
import dev.hardwood.metadata.RepetitionType;
import dev.hardwood.reader.ParquetFileReader;
import dev.hardwood.schema.ColumnSchema;
import dev.hardwood.schema.FileSchema;
import dev.hardwood.writer.ParquetFileWriter;

public class Main {
	public static void main(String[] args) throws IOException {
		writeParquetFile(Path.of("/Users/tomschindl/git-beso/rsd/dsl/experiments/hardwood-playground/person2.parquet"));
		readParquetFile(Path.of("/Users/tomschindl/git-beso/rsd/dsl/experiments/hardwood-playground/person2.parquet"));
	}

	/*
	 * public static void writeParquetFile(Path path) throws IOException {
	 * FileSchema schema = FileSchema.builder("person")
	 * .addColumn("id", PhysicalType.INT64, RepetitionType.REQUIRED)
	 * .list("addresses", RepetitionType.OPTIONAL,
	 * element -> element.struct(RepetitionType.OPTIONAL, address -> address
	 * .addColumn("city", PhysicalType.BYTE_ARRAY, RepetitionType.REQUIRED, new
	 * LogicalType.StringType())
	 * .addColumn("zip", PhysicalType.BYTE_ARRAY, RepetitionType.OPTIONAL, new
	 * LogicalType.StringType())))
	 * .list("phones", RepetitionType.OPTIONAL,
	 * element -> element.primitive(PhysicalType.BYTE_ARRAY,
	 * RepetitionType.REQUIRED,
	 * new LogicalType.StringType()))
	 * .map("props", RepetitionType.OPTIONAL, PhysicalType.BYTE_ARRAY, new
	 * LogicalType.StringType(),
	 * value -> value.primitive(PhysicalType.INT64, RepetitionType.OPTIONAL))
	 * .build();
	 * 
	 * try (ParquetFileWriter writer = ParquetFileWriter.create(OutputFile.of(path),
	 * schema)) {
	 * var rows = writer.rowWriter();
	 * rows.writeRow(row -> row
	 * .setLong("id", 1)
	 * .setList("addresses", addresses -> addresses
	 * .addStruct(element -> element
	 * .setString("city", "Innsbruck")
	 * .setString("zip", "6020"))
	 * .addStruct(element -> element
	 * .setString("city", "Baumkirchen")
	 * .setString("zip", "6121")))
	 * .setList("phones", phones -> phones
	 * .addString("+49 30 1234")
	 * .addString("+49 30 5678"))
	 * .setMap("props", props -> props
	 * .addEntry(entry -> entry.setString("key", "reads").setLong("value", 12))
	 * .addEntry(entry -> entry.setString("key", "writes").setNull("value"))));
	 * }
	 * }
	 */

	public static void writeParquetFile(Path path) throws IOException {
		FileSchema schema = FileSchema.builder("person")
				.addColumn("id", PhysicalType.INT64, RepetitionType.REQUIRED)
				.struct("address", RepetitionType.OPTIONAL, address -> address
						.addColumn("city", PhysicalType.BYTE_ARRAY, RepetitionType.REQUIRED, new LogicalType.StringType())
						.addColumn("zip", PhysicalType.BYTE_ARRAY, RepetitionType.OPTIONAL, new LogicalType.StringType()))
				.list("phones", RepetitionType.OPTIONAL,
						element -> element.primitive(PhysicalType.BYTE_ARRAY, RepetitionType.REQUIRED,
								new LogicalType.StringType()))
				.map("props", RepetitionType.OPTIONAL, PhysicalType.BYTE_ARRAY, new LogicalType.StringType(),
						value -> value.primitive(PhysicalType.INT64, RepetitionType.OPTIONAL))
				.build();

		try (ParquetFileWriter writer = ParquetFileWriter.create(OutputFile.of(path), schema)) {
			var rows = writer.rowWriter();
			rows.writeRow(row -> row
					.setLong("id", 1)
					.setStruct("address", address -> address
							.setString("city", "Berlin")
							.setString("zip", "10115"))
					.setList("phones", phones -> phones
							.addString("+49 30 1234")
							.addString("+49 30 5678"))
					.setMap("props", props -> props
							.addEntry(entry -> entry.setString("key", "reads").setLong("value", 12))
							.addEntry(entry -> entry.setString("key", "writes").setNull("value"))));
		}
	}

	public static void readParquetFile(Path path) throws IOException {
		try (ParquetFileReader reader = ParquetFileReader.open(InputFile.of(path))) {

			System.out.println("Total rows: " + reader.getFileMetaData().numRows());

			FileSchema schema = reader.getFileSchema();
			for (int i = 0; i < schema.getColumnCount(); i++) {
				ColumnSchema column = schema.getColumn(i);
				System.out.println(column.name() + " : " + column.type());
			}
		}
	}
}
