package dev.rsdlang.sample.client;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;

import java.net.URI;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;

import dev.rsdlang.sample.client.jdkhttp.JDKSpecSamplesClient;
import dev.rsdlang.sample.client.jdkhttp.JDKSpecSamplesClient.ContentTypeEncoding;
import dev.rsdlang.sample.client.model.NilResult;

public class ScalarSubstition_ServiceServiceTest {
    static ScalarSubstition_ServiceService[] serviceProvider() {
        var baseBuilder = JDKSpecSamplesClient.builder().baseURI(URI.create("http://localhost:3000"));
        var JSON = baseBuilder.build();
        var MSGPACK = baseBuilder.contentTypeEncoding(ContentTypeEncoding.APPLICATION_VND_MSGPACK).build();

        return new ScalarSubstition_ServiceService[] {
                JSON.service(ScalarSubstition_ServiceService.class),
                MSGPACK.service(ScalarSubstition_ServiceService.class),
        };
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    public void get(ScalarSubstition_ServiceService service) {
        var result = service.get();
        assertEquals("[0,0]", result.toString());
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    public void list(ScalarSubstition_ServiceService service) {
        var result = service.list();
        assertEquals(1, result.size());
        assertEquals("[0,0]", result.get(0).toString());
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    public void post(ScalarSubstition_ServiceService service) {
        var result = service.post(new MyRange(1, 1));
        assertEquals("[1,1]", result.toString());
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    public void postOpt(ScalarSubstition_ServiceService service) {
        assertEquals(NilResult.UNDEFINED, service.postOpt());
        assertEquals(NilResult.DEFINED, service.postOpt(new MyRange(1, 1)));
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    public void postNull(ScalarSubstition_ServiceService service) {
        assertEquals(NilResult.NULL, service.postNull(null));
        assertEquals(NilResult.DEFINED, service.postNull(new MyRange(1, 1)));
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    public void postOptNull(ScalarSubstition_ServiceService service) {
        assertEquals(NilResult.UNDEFINED, service.postOptNull());
        assertEquals(NilResult.NULL, service.postOptNull(null));
        assertEquals(NilResult.DEFINED, service.postOptNull(new MyRange(1, 1)));
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    public void postList(ScalarSubstition_ServiceService service) {
        var result = service.postList(List.of(new MyRange(1, 1)));
        assertEquals(1, result.size());
        assertEquals("[1,1]", result.get(0).toString());
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    public void postListOpt(ScalarSubstition_ServiceService service) {
        assertEquals(NilResult.UNDEFINED, service.postListOpt());
        assertEquals(NilResult.DEFINED, service.postListOpt(List.of(new MyRange(1, 1))));
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    public void postListNull(ScalarSubstition_ServiceService service) {
        assertEquals(NilResult.NULL, service.postListNull(null));
        assertEquals(NilResult.DEFINED, service.postListNull(List.of(new MyRange(0, 0))));
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    public void postListOptNull(ScalarSubstition_ServiceService service) {
        assertEquals(NilResult.UNDEFINED, service.postListOptNull());
        assertEquals(NilResult.NULL, service.postListOptNull(null));
        assertEquals(NilResult.DEFINED, service.postListOptNull(List.of(new MyRange(0, 0))));
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    public void query(ScalarSubstition_ServiceService service) {
        var result = service.query(new MyRange(1, 1));
        assertEquals("[1,1]", result.toString());
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    public void queryOpt(ScalarSubstition_ServiceService service) {
        assertEquals(NilResult.UNDEFINED, service.queryOpt());
        assertEquals(NilResult.DEFINED, service.queryOpt(new MyRange(1, 1)));
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    public void queryNull(ScalarSubstition_ServiceService service) {
        assertEquals(NilResult.NULL, service.queryNull(null));
        assertEquals(NilResult.DEFINED, service.queryNull(new MyRange(1, 1)));
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    public void queryOptNull(ScalarSubstition_ServiceService service) {
        assertEquals(NilResult.UNDEFINED, service.queryOptNull());
        assertEquals(NilResult.NULL, service.queryOptNull(null));
        assertEquals(NilResult.DEFINED, service.queryOptNull(new MyRange(1, 1)));
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    public void queryList(ScalarSubstition_ServiceService service) {
        var result = service.queryList(List.of(new MyRange(1, 1)));
        assertEquals(1, result.size());
        assertEquals("[1,1]", result.get(0).toString());
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    public void queryListOpt(ScalarSubstition_ServiceService service) {
        // assertEquals(NilResult.UNDEFINED, service.queryListOpt());
        assertEquals(NilResult.DEFINED, service.queryListOpt(List.of(new MyRange(1,
                1))));
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    public void queryListNull(ScalarSubstition_ServiceService service) {
        // assertEquals(NilResult.NULL, service.queryListNull(null));
        assertEquals(NilResult.DEFINED, service.queryListNull(List.of(new MyRange(1, 1))));
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    public void queryListOptNull(ScalarSubstition_ServiceService service) {
        // assertEquals(NilResult.UNDEFINED, service.queryListOptNull());
        // assertEquals(NilResult.NULL, service.queryListOptNull(null));
        assertEquals(NilResult.DEFINED, service.queryListOptNull(List.of(new MyRange(1, 1))));
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    public void header(ScalarSubstition_ServiceService service) {
        var result = service.header(new MyRange(1, 1));
        assertEquals("[1,1]", result.toString());
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    public void headerOpt(ScalarSubstition_ServiceService service) {
        assertEquals(NilResult.UNDEFINED, service.headerOpt());
        assertEquals(NilResult.DEFINED, service.headerOpt(new MyRange(1, 1)));
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    public void headerNull(ScalarSubstition_ServiceService service) {
        assertEquals(NilResult.NULL, service.headerNull(null));
        assertEquals(NilResult.DEFINED, service.headerNull(new MyRange(1, 1)));
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    public void headerOptNull(ScalarSubstition_ServiceService service) {
        assertEquals(NilResult.UNDEFINED, service.headerOptNull());
        assertEquals(NilResult.NULL, service.headerOptNull(null));
        assertEquals(NilResult.DEFINED, service.headerOptNull(new MyRange(1, 1)));
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    public void headerList(ScalarSubstition_ServiceService service) {
        var result = service.headerList(List.of(new MyRange(0, 0)));
        assertEquals(1, result.size());
        assertEquals("[0,0]", result.get(0).toString());
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    public void headerListOpt(ScalarSubstition_ServiceService service) {
        assertEquals(NilResult.UNDEFINED, service.headerListOpt());
        assertEquals(NilResult.DEFINED, service.headerListOpt(List.of(new MyRange(0, 0))));
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    public void headerListNull(ScalarSubstition_ServiceService service) {
        assertEquals(NilResult.NULL, service.headerListNull(null));
        assertEquals(NilResult.DEFINED, service.headerListNull(List.of(new MyRange(0, 0))));
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    public void headerListOptNull(ScalarSubstition_ServiceService service) {
        assertEquals(NilResult.UNDEFINED, service.headerListOptNull());
        assertEquals(NilResult.NULL, service.headerListOptNull(null));
        assertEquals(NilResult.DEFINED, service.headerListOptNull(List.of(new MyRange(0, 0))));
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    public void fail(ScalarSubstition_ServiceService service) {
        try {
            service.fail();
        } catch (SampleErrorScalarSubException e) {
            assertEquals("This is a sample error from the server", e.getMessage());
            assertEquals("[0,0]", e.data().toString());
        }
    }
}
