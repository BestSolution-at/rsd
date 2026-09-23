package dev.rsdlang;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

import org.apache.avro.file.DataFileReader;
import org.apache.avro.file.DataFileWriter;
import org.apache.avro.file.SeekableByteArrayInput;
import org.apache.avro.generic.GenericDatumReader;
import org.apache.avro.generic.GenericRecord;
import org.apache.avro.io.DatumReader;
import org.apache.avro.io.DatumWriter;
import org.apache.avro.specific.SpecificDatumWriter;

import dev.rsdlang.sample.avro.EnumRecord;
import dev.rsdlang.sample.avro.NULL;
import dev.rsdlang.sample.avro.SampleEnum;

public class EnumSample {
	public static void main(String[] args) throws IOException {
		DatumWriter<EnumRecord> userDatumWriter = new SpecificDatumWriter<EnumRecord>(EnumRecord.class);

		DataFileWriter<EnumRecord> dataFileWriter = new DataFileWriter<EnumRecord>(userDatumWriter);

		ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
		EnumRecord enumRecord = new EnumRecord();
		dataFileWriter.create(enumRecord.getSchema(), outputStream);
		enumRecord.setValue(SampleEnum.A);
		enumRecord.setValueNull(NULL.NULL);
		enumRecord.setValueOpt(SampleEnum.A);
		enumRecord.setValueOptNull(SampleEnum.B);
		enumRecord.setList(List.of(SampleEnum.A, SampleEnum.B));
		enumRecord.setListNull(List.of(SampleEnum.A, SampleEnum.B));
		enumRecord.setListOpt(List.of(SampleEnum.A, SampleEnum.B));
		enumRecord.setListOptNull(List.of(SampleEnum.A, SampleEnum.B));
		dataFileWriter.append(enumRecord);
		dataFileWriter.close();

		DatumReader<GenericRecord> datumReader = new GenericDatumReader<GenericRecord>(EnumRecord.SCHEMA$);
		DataFileReader<GenericRecord> dataFileReader = new DataFileReader<GenericRecord>(
				new SeekableByteArrayInput(outputStream.toByteArray()), datumReader);
		var record = dataFileReader.next();
		System.err.println(record.get("value").getClass());
		dataFileReader.close();
	}
}
