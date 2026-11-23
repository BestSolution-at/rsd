package dev.rsdlang.sample.server.rest.utils;

import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class JsonContentParser extends JsonUtilsContentParser {
	public JsonContentParser() {
		super("application/json");
	}
}
