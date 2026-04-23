package dev.rsdlang;

import java.io.ByteArrayInputStream;

public class Main {
	public static void main(String[] args) {

		var stream = new ByteArrayInputStream(new byte[0]);
		if (stream.markSupported()) {
			stream.mark(1);
			int x = stream.read();
			stream.reset();
			System.err.println(x);
		} else {
			System.out.println("mark not supported");
		}
	}

	private static <T, U extends X<T>> U createX(Class<T> type) {
		return null;
	}

	static class X<T> {
	}

	static class Y<Q, T extends X<Q>> {

	}
}
