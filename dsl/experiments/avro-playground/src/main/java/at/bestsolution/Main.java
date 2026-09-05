package at.bestsolution;

import java.io.File;
import java.io.IOException;

import org.apache.avro.Schema;
import org.apache.avro.SchemaParser;
import org.apache.avro.file.DataFileReader;
import org.apache.avro.file.DataFileWriter;
import org.apache.avro.generic.GenericDatumReader;
import org.apache.avro.generic.GenericRecord;
import org.apache.avro.io.DatumReader;
import org.apache.avro.io.DatumWriter;
import org.apache.avro.specific.SpecificDatumWriter;

import example.avro.User;

public class Main {
	public static void main(String[] args) throws IOException {
		User user1 = new User();
		user1.setName("Alyssa");
		user1.setFavoriteNumber(256);
		// Leave favorite color null

		// Alternate constructor
		User user2 = new User("Ben", 7, "red");

		// Construct via builder
		User user3 = User.newBuilder()
				.setName("Charlie")
				.setFavoriteColor("blue")
				.setFavoriteNumber(null)
				.build();

		DatumWriter<User> userDatumWriter = new SpecificDatumWriter<User>(User.class);
		DataFileWriter<User> dataFileWriter = new DataFileWriter<User>(userDatumWriter);
		dataFileWriter.create(user1.getSchema(),
				new File("/Users/tomschindl/git-beso/rsd/dsl/experiments/avro-playground/users.avro"));
		dataFileWriter.append(user1);
		dataFileWriter.append(user2);
		dataFileWriter.append(user3);
		dataFileWriter.close();

		Schema schema = new SchemaParser()
				.parse(new File("/Users/tomschindl/git-beso/rsd/dsl/experiments/avro-playground/src/main/avro/user.avsc"))
				.mainSchema();
		DatumReader<GenericRecord> datumReader = new GenericDatumReader<GenericRecord>(schema);
		DataFileReader<GenericRecord> dataFileReader = new DataFileReader<GenericRecord>(
				new File("/Users/tomschindl/git-beso/rsd/dsl/experiments/avro-playground/users.avro"), datumReader);
		GenericRecord user = null;
		while (dataFileReader.hasNext()) {
			// Reuse user object by passing it to next(). This saves us from
			// allocating and garbage collecting many objects for files with
			// many items.
			user = dataFileReader.next(user);
			System.out.println(user);
		}
	}
}
