package dev.rsdlang.sample.server.service.handler.binary;

import java.io.IOException;
import java.io.InputStream;

public class StreamUtils {
	public static int streamLength(InputStream stream) {
		var rv = 0;
		try {
			while (stream.read() != -1) {
				rv++;
			}
			return rv;
		} catch (IOException e) {
			throw new RuntimeException("Failed to determine stream length", e);
		}
	}
}
