package at.bestsolution;

import java.io.IOException;

import com.amazon.ion.IonWriter;
import com.amazon.ion.system.IonBinaryWriterBuilder;

import jakarta.json.Json;
import jakarta.json.JsonNumber;
import jakarta.json.JsonString;
import jakarta.json.JsonValue;

public class Main {
	public static void main(String[] args) throws IOException {
		var v = Json.createReader(Main.class.getResourceAsStream("sample.json")).readValue();

		var bos = new java.io.ByteArrayOutputStream();
		var writer = IonBinaryWriterBuilder.standard().build(bos);
		// var reader = IonReaderBuilder.standard().build(bos.toByteArray());

		encodeJson(v, writer);
		writer.close();
	}

	private static void encodeJson(JsonValue jsonValue, IonWriter writer) throws IOException {
		switch (jsonValue.getValueType()) {
			case ARRAY:
				writer.stepIn(com.amazon.ion.IonType.LIST);
				for (JsonValue v : jsonValue.asJsonArray()) {
					encodeJson(v, writer);
				}
				writer.stepOut();
				break;
			case OBJECT:
				writer.stepIn(com.amazon.ion.IonType.STRUCT);
				jsonValue.asJsonObject().forEach((k, v) -> {
					try {
						writer.setFieldName(k);
						encodeJson(v, writer);
					} catch (Exception e) {
						throw new RuntimeException(e);
					}
				});
				writer.stepOut();
				break;
			case STRING:
				writer.writeString(((JsonString) jsonValue).getString());
				break;
			case NUMBER:
				var num = (JsonNumber) jsonValue;
				if (num.isIntegral()) {
					writer.writeInt(num.longValue());
				} else {
					writer.writeFloat(num.doubleValue());
				}
				break;
			case TRUE:
				writer.writeBool(true);
				break;
			case FALSE:
				writer.writeBool(false);
				break;
			case NULL:
				writer.writeNull();
				break;
			default:
				throw new IllegalArgumentException("Unsupported type: " + jsonValue.getValueType());
		}
	}
}
