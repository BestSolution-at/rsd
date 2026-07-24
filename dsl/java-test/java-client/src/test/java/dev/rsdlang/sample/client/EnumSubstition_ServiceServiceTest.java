package dev.rsdlang.sample.client;

import static org.junit.jupiter.api.Assertions.assertEquals;
import java.util.List;
import java.net.URI;
import java.time.Month;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;

import dev.rsdlang.sample.client.jdkhttp.JDKSpecSamplesClient;
import dev.rsdlang.sample.client.jdkhttp.JDKSpecSamplesClient.ContentTypeEncoding;
import dev.rsdlang.sample.client.model.NilResult;

public class EnumSubstition_ServiceServiceTest {
    private static SpecSamplesClient JSON;
    private static SpecSamplesClient MSGPACK;

    @BeforeAll
    static void setUp() {
        var baseBuilder = JDKSpecSamplesClient.builder().baseURI(URI.create("http://localhost:3000"));
        JSON = baseBuilder.build();
        MSGPACK = baseBuilder.contentTypeEncoding(ContentTypeEncoding.APPLICATION_VND_MSGPACK).build();
    }

    static EnumSubstition_ServiceService[] serviceProvider() {
        return new EnumSubstition_ServiceService[] {
                JSON.service(EnumSubstition_ServiceService.class),
                MSGPACK.service(EnumSubstition_ServiceService.class),
        };
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    void get(EnumSubstition_ServiceService service) {
        var result = service.get().orThrow();
        assertEquals(DayOfWeek.MONDAY, result);
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    void list(EnumSubstition_ServiceService service) {
        var result = service.list().orThrow();
        assertEquals(DayOfWeek.MONDAY, result.get(0));
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    void post(EnumSubstition_ServiceService service) {
        var result = service.post(DayOfWeek.MONDAY).orThrow();
        assertEquals(DayOfWeek.MONDAY, result);
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    void postOpt(EnumSubstition_ServiceService service) {
        var result = service.postOpt().orThrow();
        assertEquals(NilResult.UNDEFINED, result);
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    void postOptWithValue(EnumSubstition_ServiceService service) {
        var result = service.postOpt(DayOfWeek.MONDAY).orThrow();
        assertEquals(NilResult.DEFINED, result);
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    void postNull(EnumSubstition_ServiceService service) {
        var result = service.postNull(null).orThrow();
        assertEquals(NilResult.NULL, result);
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    void postNullWithValue(EnumSubstition_ServiceService service) {
        var result = service.postNull(DayOfWeek.MONDAY).orThrow();
        assertEquals(NilResult.DEFINED, result);
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    void postOptNull(EnumSubstition_ServiceService service) {
        var result = service.postOptNull().orThrow();
        assertEquals(NilResult.UNDEFINED, result);
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    void postOptNullWithValue(EnumSubstition_ServiceService service) {
        var result = service.postOptNull(DayOfWeek.MONDAY).orThrow();
        assertEquals(NilResult.DEFINED, result);
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    void postOptNullWithNull(EnumSubstition_ServiceService service) {
        var result = service.postOptNull(null).orThrow();
        assertEquals(NilResult.NULL, result);
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    void postList(EnumSubstition_ServiceService service) {
        var result = service.postList(List.of(DayOfWeek.MONDAY)).orThrow();
        assertEquals(DayOfWeek.MONDAY, result.get(0));
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    void postListOpt(EnumSubstition_ServiceService service) {
        var result = service.postListOpt().orThrow();
        assertEquals(NilResult.UNDEFINED, result);
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    void postListOptWithValue(EnumSubstition_ServiceService service) {
        var result = service.postListOpt(List.of(DayOfWeek.MONDAY)).orThrow();
        assertEquals(NilResult.DEFINED, result);
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    void postListNull(EnumSubstition_ServiceService service) {
        var result = service.postListNull(null).orThrow();
        assertEquals(NilResult.NULL, result);
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    void postListNullWithValue(EnumSubstition_ServiceService service) {
        var result = service.postListNull(List.of(DayOfWeek.MONDAY)).orThrow();
        assertEquals(NilResult.DEFINED, result);
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    void postListOptNull(EnumSubstition_ServiceService service) {
        var result = service.postListOptNull().orThrow();
        assertEquals(NilResult.UNDEFINED, result);
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    void postListOptNullWithValue(EnumSubstition_ServiceService service) {
        var result = service.postListOptNull(List.of(DayOfWeek.MONDAY)).orThrow();
        assertEquals(NilResult.DEFINED, result);
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    void postListOptNullWithNull(EnumSubstition_ServiceService service) {
        var result = service.postListOptNull(null).orThrow();
        assertEquals(NilResult.NULL, result);
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    void query(EnumSubstition_ServiceService service) {
        var result = service.query(DayOfWeek.MONDAY).orThrow();
        assertEquals(DayOfWeek.MONDAY, result);
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    void queryOpt(EnumSubstition_ServiceService service) {
        var result = service.queryOpt().orThrow();
        assertEquals(NilResult.UNDEFINED, result);
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    void queryOptWithValue(EnumSubstition_ServiceService service) {
        var result = service.queryOpt(DayOfWeek.MONDAY).orThrow();
        assertEquals(NilResult.DEFINED, result);
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    void queryNull(EnumSubstition_ServiceService service) {
        var result = service.queryNull(null).orThrow();
        assertEquals(NilResult.NULL, result);
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    void queryNullWithValue(EnumSubstition_ServiceService service) {
        var result = service.queryNull(DayOfWeek.MONDAY).orThrow();
        assertEquals(NilResult.DEFINED, result);
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    void queryOptNull(EnumSubstition_ServiceService service) {
        var result = service.queryOptNull().orThrow();
        assertEquals(NilResult.UNDEFINED, result);
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    void queryOptNullWithValue(EnumSubstition_ServiceService service) {
        var result = service.queryOptNull(DayOfWeek.MONDAY).orThrow();
        assertEquals(NilResult.DEFINED, result);
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    void queryOptNullWithNull(EnumSubstition_ServiceService service) {
        var result = service.queryOptNull(null).orThrow();
        assertEquals(NilResult.NULL, result);
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    void queryList(EnumSubstition_ServiceService service) {
        var result = service.queryList(List.of(DayOfWeek.MONDAY)).orThrow();
        assertEquals(DayOfWeek.MONDAY, result.get(0));
    }

    // @ParameterizedTest
    // @MethodSource("serviceProvider")
    // void queryListOpt(EnumSubstition_ServiceService service) {
    // var result = service.queryListOpt().orThrow();
    // assertEquals(NilResult.UNDEFINED, result);
    // }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    void queryListOptWithValue(EnumSubstition_ServiceService service) {
        var result = service.queryListOpt(List.of(DayOfWeek.MONDAY)).orThrow();
        assertEquals(NilResult.DEFINED, result);
    }

    // @ParameterizedTest
    // @MethodSource("serviceProvider")
    // void queryListNull(EnumSubstition_ServiceService service) {
    // var result = service.queryListNull(null).orThrow();
    // assertEquals(NilResult.NULL, result);
    // }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    void queryListNullWithValue(EnumSubstition_ServiceService service) {
        var result = service.queryListNull(List.of(DayOfWeek.MONDAY)).orThrow();
        assertEquals(NilResult.DEFINED, result);
    }

    // @ParameterizedTest
    // @MethodSource("serviceProvider")
    // void queryListOptNull(EnumSubstition_ServiceService service) {
    // var result = service.queryListOptNull().orThrow();
    // assertEquals(NilResult.UNDEFINED, result);
    // }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    void queryListOptNullWithValue(EnumSubstition_ServiceService service) {
        var result = service.queryListOptNull(List.of(DayOfWeek.MONDAY)).orThrow();
        assertEquals(NilResult.DEFINED, result);
    }

    // @ParameterizedTest
    // @MethodSource("serviceProvider")
    // void queryListOptNullWithNull(EnumSubstition_ServiceService service) {
    // var result = service.queryListOptNull(null).orThrow();
    // assertEquals(NilResult.NULL, result);
    // }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    void header(EnumSubstition_ServiceService service) {
        var result = service.header(DayOfWeek.MONDAY).orThrow();
        assertEquals(DayOfWeek.MONDAY, result);
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    void headerOpt(EnumSubstition_ServiceService service) {
        var result = service.headerOpt().orThrow();
        assertEquals(NilResult.UNDEFINED, result);
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    void headerOptWithValue(EnumSubstition_ServiceService service) {
        var result = service.headerOpt(DayOfWeek.MONDAY).orThrow();
        assertEquals(NilResult.DEFINED, result);
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    void headerNull(EnumSubstition_ServiceService service) {
        var result = service.headerNull(null).orThrow();
        assertEquals(NilResult.NULL, result);
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    void headerNullWithValue(EnumSubstition_ServiceService service) {
        var result = service.headerNull(DayOfWeek.MONDAY).orThrow();
        assertEquals(NilResult.DEFINED, result);
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    void headerOptNull(EnumSubstition_ServiceService service) {
        var result = service.headerOptNull().orThrow();
        assertEquals(NilResult.UNDEFINED, result);
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    void headerOptNullWithValue(EnumSubstition_ServiceService service) {
        var result = service.headerOptNull(DayOfWeek.MONDAY).orThrow();
        assertEquals(NilResult.DEFINED, result);
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    void headerOptNullWithNull(EnumSubstition_ServiceService service) {
        var result = service.headerOptNull(null).orThrow();
        assertEquals(NilResult.NULL, result);
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    void headerList(EnumSubstition_ServiceService service) {
        var result = service.headerList(List.of(DayOfWeek.MONDAY)).orThrow();
        assertEquals(DayOfWeek.MONDAY, result.get(0));
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    void headerListOpt(EnumSubstition_ServiceService service) {
        var result = service.headerListOpt().orThrow();
        assertEquals(NilResult.UNDEFINED, result);
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    void headerListOptWithValue(EnumSubstition_ServiceService service) {
        var result = service.headerListOpt(List.of(DayOfWeek.MONDAY)).orThrow();
        assertEquals(NilResult.DEFINED, result);
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    void headerListOptNull(EnumSubstition_ServiceService service) {
        var result = service.headerListOptNull().orThrow();
        assertEquals(NilResult.UNDEFINED, result);
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    void headerListOptNullWithValue(EnumSubstition_ServiceService service) {
        var result = service.headerListOptNull(List.of(DayOfWeek.MONDAY)).orThrow();
        assertEquals(NilResult.DEFINED, result);
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    void headerListOptNullWithNull(EnumSubstition_ServiceService service) {
        var result = service.headerListOptNull(null).orThrow();
        assertEquals(NilResult.NULL, result);
    }

    @ParameterizedTest
    @MethodSource("serviceProvider")
    void multiBody(EnumSubstition_ServiceService service) {
        var result = service.multiBody(DayOfWeek.MONDAY, Month.JANUARY).orThrow();
        assertEquals("MONDAY JANUARY", result);
    }
}
