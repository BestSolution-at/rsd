package dev.rsdlang.sample.client.jdkhttp.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

public class ServiceUtilsTest {
    @Test
    public void encodeAsciiString() {
        assertEquals("Hello World!", ServiceUtils.encodeAsciiString("Hello World!"));
        assertEquals("Hello+World!", ServiceUtils.encodeAsciiString("Hello+World!"));
        assertEquals("Hello/World!", ServiceUtils.encodeAsciiString("Hello/World!"));
        assertEquals("a \\u0100 \\ud800\\udc00 \\u6587 \\ud83e\\udd84", ServiceUtils.encodeAsciiString("a Ā 𐀀 文 🦄"));
        assertEquals("null", ServiceUtils.encodeAsciiString("null"));
    }
}
