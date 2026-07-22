package dev.rsdlang.sample.client;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;

import java.net.URI;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;

import dev.rsdlang.sample.client.jdkhttp.JDKSpecSamplesClient;
import dev.rsdlang.sample.client.jdkhttp.JDKSpecSamplesClient.ContentTypeEncoding;
import dev.rsdlang.sample.client.model.NilResult;
import dev.rsdlang.sample.client.model.ZoneId;

public class ScalarSubstition_ServiceServiceTest {
    private static SpecSamplesClient JSON;
    private static SpecSamplesClient MSGPACK;

    @BeforeAll
    static void setUp() {
        var baseBuilder = JDKSpecSamplesClient.builder().baseURI(URI.create("http://localhost:3000"));
        JSON = baseBuilder.build();
        MSGPACK = baseBuilder.contentTypeEncoding(ContentTypeEncoding.APPLICATION_VND_MSGPACK).build();
    }

    static ScalarSubstition_ServiceService[] serviceProvider() {
        return new ScalarSubstition_ServiceService[] {
                JSON.service(ScalarSubstition_ServiceService.class),
                MSGPACK.service(ScalarSubstition_ServiceService.class),
        };
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    public void get(ScalarSubstition_ServiceService service) {
        var result = service.get().orThrow();
        assertEquals("[0,0]", MyRange.toString(result));
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    public void list(ScalarSubstition_ServiceService service) {
        var result = service.list().orThrow();
        assertEquals(1, result.size());
        assertEquals("[0,0]", MyRange.toString(result.get(0)));
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    public void post(ScalarSubstition_ServiceService service) {
        var result = service.post(new MyRange(1, 1)).orThrow();
        assertEquals("[1,1]", MyRange.toString(result));
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    public void postOpt(ScalarSubstition_ServiceService service) {
        assertEquals(NilResult.UNDEFINED, service.postOpt().orThrow());
        assertEquals(NilResult.DEFINED, service.postOpt(new MyRange(1, 1)).orThrow());
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    public void postNull(ScalarSubstition_ServiceService service) {
        assertEquals(NilResult.NULL, service.postNull(null).orThrow());
        assertEquals(NilResult.DEFINED, service.postNull(new MyRange(1, 1)).orThrow());
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    public void postOptNull(ScalarSubstition_ServiceService service) {
        assertEquals(NilResult.UNDEFINED, service.postOptNull().orThrow());
        assertEquals(NilResult.NULL, service.postOptNull(null).orThrow());
        assertEquals(NilResult.DEFINED, service.postOptNull(new MyRange(1, 1)).orThrow());
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    public void postList(ScalarSubstition_ServiceService service) {
        var result = service.postList(List.of(new MyRange(1, 1))).orThrow();
        assertEquals(1, result.size());
        assertEquals("[1,1]", MyRange.toString(result.get(0)));
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    public void postListOpt(ScalarSubstition_ServiceService service) {
        assertEquals(NilResult.UNDEFINED, service.postListOpt().orThrow());
        assertEquals(NilResult.DEFINED, service.postListOpt(List.of(new MyRange(1, 1))).orThrow());
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    public void postListNull(ScalarSubstition_ServiceService service) {
        assertEquals(NilResult.NULL, service.postListNull(null).orThrow());
        assertEquals(NilResult.DEFINED, service.postListNull(List.of(new MyRange(0, 0))).orThrow());
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    public void postListOptNull(ScalarSubstition_ServiceService service) {
        assertEquals(NilResult.UNDEFINED, service.postListOptNull().orThrow());
        assertEquals(NilResult.NULL, service.postListOptNull(null).orThrow());
        assertEquals(NilResult.DEFINED, service.postListOptNull(List.of(new MyRange(0, 0))).orThrow());
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    public void query(ScalarSubstition_ServiceService service) {
        var result = service.query(new MyRange(1, 1)).orThrow();
        assertEquals("[1,1]", MyRange.toString(result));
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    public void queryOpt(ScalarSubstition_ServiceService service) {
        assertEquals(NilResult.UNDEFINED, service.queryOpt().orThrow());
        assertEquals(NilResult.DEFINED, service.queryOpt(new MyRange(1, 1)).orThrow());
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    public void queryNull(ScalarSubstition_ServiceService service) {
        assertEquals(NilResult.NULL, service.queryNull(null).orThrow());
        assertEquals(NilResult.DEFINED, service.queryNull(new MyRange(1, 1)).orThrow());
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    public void queryOptNull(ScalarSubstition_ServiceService service) {
        assertEquals(NilResult.UNDEFINED, service.queryOptNull().orThrow());
        assertEquals(NilResult.NULL, service.queryOptNull(null).orThrow());
        assertEquals(NilResult.DEFINED, service.queryOptNull(new MyRange(1, 1)).orThrow());
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    public void queryList(ScalarSubstition_ServiceService service) {
        var result = service.queryList(List.of(new MyRange(1, 1))).orThrow();
        assertEquals(1, result.size());
        assertEquals("[1,1]", MyRange.toString(result.get(0)));
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    public void queryListOpt(ScalarSubstition_ServiceService service) {
        // assertEquals(NilResult.UNDEFINED, service.queryListOpt());
        assertEquals(NilResult.DEFINED, service.queryListOpt(List.of(new MyRange(1,
                1))).orThrow());
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    public void queryListNull(ScalarSubstition_ServiceService service) {
        // assertEquals(NilResult.NULL, service.queryListNull(null));
        assertEquals(NilResult.DEFINED, service.queryListNull(List.of(new MyRange(1, 1))).orThrow());
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    public void queryListOptNull(ScalarSubstition_ServiceService service) {
        // assertEquals(NilResult.UNDEFINED, service.queryListOptNull());
        // assertEquals(NilResult.NULL, service.queryListOptNull(null));
        assertEquals(NilResult.DEFINED, service.queryListOptNull(List.of(new MyRange(1, 1))).orThrow());
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    public void header(ScalarSubstition_ServiceService service) {
        var result = service.header(new MyRange(1, 1)).orThrow();
        assertEquals("[1,1]", MyRange.toString(result));
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    public void headerOpt(ScalarSubstition_ServiceService service) {
        assertEquals(NilResult.UNDEFINED, service.headerOpt().orThrow());
        assertEquals(NilResult.DEFINED, service.headerOpt(new MyRange(1, 1)).orThrow());
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    public void headerNull(ScalarSubstition_ServiceService service) {
        assertEquals(NilResult.NULL, service.headerNull(null).orThrow());
        assertEquals(NilResult.DEFINED, service.headerNull(new MyRange(1, 1)).orThrow());
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    public void headerOptNull(ScalarSubstition_ServiceService service) {
        assertEquals(NilResult.UNDEFINED, service.headerOptNull().orThrow());
        assertEquals(NilResult.NULL, service.headerOptNull(null).orThrow());
        assertEquals(NilResult.DEFINED, service.headerOptNull(new MyRange(1, 1)).orThrow());
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    public void headerList(ScalarSubstition_ServiceService service) {
        var result = service.headerList(List.of(new MyRange(0, 0))).orThrow();
        assertEquals(1, result.size());
        assertEquals("[0,0]", MyRange.toString(result.get(0)));
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    public void headerListOpt(ScalarSubstition_ServiceService service) {
        assertEquals(NilResult.UNDEFINED, service.headerListOpt().orThrow());
        assertEquals(NilResult.DEFINED, service.headerListOpt(List.of(new MyRange(0, 0))).orThrow());
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    public void headerListNull(ScalarSubstition_ServiceService service) {
        assertEquals(NilResult.NULL, service.headerListNull(null).orThrow());
        assertEquals(NilResult.DEFINED, service.headerListNull(List.of(new MyRange(0, 0))).orThrow());
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    public void headerListOptNull(ScalarSubstition_ServiceService service) {
        assertEquals(NilResult.UNDEFINED, service.headerListOptNull().orThrow());
        assertEquals(NilResult.NULL, service.headerListOptNull(null).orThrow());
        assertEquals(NilResult.DEFINED, service.headerListOptNull(List.of(new MyRange(0, 0))).orThrow());
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    public void fail(ScalarSubstition_ServiceService service) {
        var result = service.fail();
        switch (result) {
            case Result.OK(var value) -> Assertions.fail("Expected SampleErrorScalarSubException to be thrown");
            case Result.ERR(SampleErrorScalarSub error) -> {
                assertEquals("This is a sample error from the server", error.message());
                assertEquals("[0,0]", MyRange.toString(error.data()));
            }
            default -> Assertions.fail("Unexpected result type: " + result.getClass().getName());
        }
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    public void multiBody(ScalarSubstition_ServiceService service) {
        var result = service.multiBody(new MyRange(1, 1), ZoneId.of("Europe/Berlin")).orThrow();
        assertEquals("[1,1] Europe/Berlin", result);
    }
}
