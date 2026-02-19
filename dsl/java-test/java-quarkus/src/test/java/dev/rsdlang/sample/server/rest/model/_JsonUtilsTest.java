package dev.rsdlang.sample.server.rest.model;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.io.StringReader;
import java.util.Map;

import org.junit.jupiter.api.Test;

import jakarta.json.Json;
import jakarta.json.JsonObject;

public class _JsonUtilsTest {
	private JsonObject json(String json) {
		return Json.createReaderFactory(Map.of()).createReader(new StringReader(json)).readObject();
	}

	@Test
	public void testMapNilStrings() {
		var o = json("""
				{
					"valueNull": null
				}
				""");
		var result = _JsonUtils.mapNilStrings(o, "valueNull");
		assertNotNull(result);
	}
}
