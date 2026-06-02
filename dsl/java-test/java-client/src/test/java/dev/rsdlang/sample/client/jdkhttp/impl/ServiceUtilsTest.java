package dev.rsdlang.sample.client.jdkhttp.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

public class ServiceUtilsTest {
    @Test
    public void encodeAsciiString() {
        assertEquals("Hello World!", ServiceUtils.encodeAsciiString("Hello World!"));
        assertEquals("\\u0020Hello World!\\u0020", ServiceUtils.encodeAsciiString(" Hello World! "));
        assertEquals("\\u0020\\u0020Hello World!\\u0020\\u0020", ServiceUtils.encodeAsciiString("  Hello World!  "));
        assertEquals("\\u0020\\u0020\\u0020Hello World!\\u0020\\u0020\\u0020",
                ServiceUtils.encodeAsciiString("   Hello World!   "));

        assertEquals("Hello+World!", ServiceUtils.encodeAsciiString("Hello+World!"));
        assertEquals("Hello/World!", ServiceUtils.encodeAsciiString("Hello/World!"));

        assertEquals("a \\u0100 \\ud800\\udc00 \\u6587 \\ud83e\\udd84", ServiceUtils.encodeAsciiString("a Ā 𐀀 文 🦄"));
        assertEquals("\\u005Cu FooBar", ServiceUtils.encodeAsciiString("\\u FooBar"));
    }
}
