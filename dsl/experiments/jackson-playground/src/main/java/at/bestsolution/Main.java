package at.bestsolution;

import java.io.ByteArrayOutputStream;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.json.JsonMapper;
import com.fasterxml.jackson.dataformat.protobuf.ProtobufMapper;
import com.fasterxml.jackson.dataformat.protobuf.schema.ProtobufSchema;
import com.fasterxml.jackson.dataformat.protobuf.schema.ProtobufSchemaLoader;
import com.fasterxml.jackson.datatype.jsonp.JSONPModule;

import jakarta.json.Json;
import jakarta.json.JsonValue;

public class Main {

	public static void main(String[] args) throws Exception {
		ObjectMapper mapper = JsonMapper.builder()
				.addModule(new JSONPModule())
				.build();
		var value = mapper.readValue("{ \"key\": \"value\" }", JsonValue.class);
		System.err.println(value.getClass());
		mapper.writeValue(System.out, value);

		String protobuf_str = "message Employee {\n"
				+ " required string name = 1;\n"
				+ " required int32 age = 2;\n"
				+ " repeated string emails = 3;\n"
				+ " optional Employee boss = 4;\n"
				+ "}\n";

		ProtobufSchema schema = ProtobufSchemaLoader.std.parse(protobuf_str);
		ProtobufMapper pMapper = new ProtobufMapper();
		pMapper.registerModule(new JSONPModule());
		var w = pMapper.writer().with(schema);

		var j = Json.createObjectBuilder();
		j.add("name", "Max");
		j.add("age", 42);
		j.add("emails", Json.createArrayBuilder());
		var jsonValue = j.build();
		System.err.println(jsonValue);

		var out = new ByteArrayOutputStream();
		w.writeValue(out, jsonValue);
		System.err.println(out.size());

		var e2 = (JsonValue) pMapper
				.readerFor(JsonValue.class).with(schema).readValue(out.toByteArray());
		System.err.println(e2);
	}

}
