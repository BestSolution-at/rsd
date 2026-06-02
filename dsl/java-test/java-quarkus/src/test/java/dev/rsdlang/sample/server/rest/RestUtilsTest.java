package dev.rsdlang.sample.server.rest;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

public class RestUtilsTest {
    @Test
    public void decodeAsciiString() {
        assertEquals("Hello World!", _RestUtils.fromEscapedAscii("Hello World!"));
        assertEquals("Hello+World!", _RestUtils.fromEscapedAscii("Hello+World!"));
        assertEquals("Hello/World!", _RestUtils.fromEscapedAscii("Hello/World!"));
        assertEquals("a Ā 𐀀 文 🦄", _RestUtils.fromEscapedAscii("a \\u0100 \\ud800\\udc00 \\u6587 \\ud83e\\udd84"));
        assertEquals("null", _RestUtils.fromEscapedAscii("null"));
    }
}
