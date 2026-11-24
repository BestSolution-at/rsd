package dev.rsdlang.sample.server.rest.utils;

import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class MsgPackContentParser extends JsonUtilsContentParser {
	public MsgPackContentParser() {
		super("application/vnd.msgpack");
	}
}
