package dev.rsdlang.sample.server.rest.utils;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class ContentParserProvider {
	private final JsonContentParser jsonContentParser;
	private final MsgPackContentParser msgPackContentParser;

	@Inject
	public ContentParserProvider(
			JsonContentParser jsonContentParser,
			MsgPackContentParser msgPackContentParser) {
		this.jsonContentParser = jsonContentParser;
		this.msgPackContentParser = msgPackContentParser;
	}

	public ContentParser getParser(String contentType) {
		return switch (contentType) {
			case "application/json" -> this.jsonContentParser;
			case "application/vnd.msgpack" -> this.msgPackContentParser;
			default -> throw new IllegalArgumentException("Unsupported content type: " + contentType);
		};
	}
}
