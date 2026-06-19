package dev.rsdlang.sample.client.jdkhttp.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

public class BaseUtilsTest {
    @Test
    public void encodeAsciiString() {
        assertEquals("Hello World!", BaseUtils.encodeAsciiString("Hello World!"));
        assertEquals("\\u0020Hello World!\\u0020", BaseUtils.encodeAsciiString(" Hello World! "));
        assertEquals("\\u0020\\u0020Hello World!\\u0020\\u0020", BaseUtils.encodeAsciiString("  Hello World!  "));
        assertEquals("\\u0020\\u0020\\u0020Hello World!\\u0020\\u0020\\u0020",
                BaseUtils.encodeAsciiString("   Hello World!   "));

        assertEquals("Hello+World!", BaseUtils.encodeAsciiString("Hello+World!"));
        assertEquals("Hello/World!", BaseUtils.encodeAsciiString("Hello/World!"));
        assertEquals("Hello\\u0009World!", BaseUtils.encodeAsciiString("Hello\tWorld!"));
        assertEquals("\\u0020\\u0009Hello Tab-World!\\u0009\\u0020",
                BaseUtils.encodeAsciiString(" \tHello Tab-World!\t "));

        assertEquals("a \\u0100 \\ud800\\udc00 \\u6587 \\ud83e\\udd84", BaseUtils.encodeAsciiString("a Ā 𐀀 文 🦄"));
        assertEquals("\\u005Cu FooBar", BaseUtils.encodeAsciiString("\\u FooBar"));
    }
}
