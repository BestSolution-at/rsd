package dev.rsdlang;

import java.time.Duration;
import java.util.List;
import java.util.Map;
import java.util.stream.IntStream;

import org.jboss.resteasy.reactive.RestMulti;

import io.smallrye.mutiny.Multi;
import io.smallrye.mutiny.Uni;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("/hello")
public class GreetingResource {

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String hello() {
        return "Hello from Quarkus REST";
    }

    @GET
    @Path("/custom")
    @Produces(MediaType.APPLICATION_JSON)
    public Multi<String> helloJson() {
        var x = Uni.createFrom().item("Hello from Quarkus REST in JSON");
        var rv = RestMulti.fromMultiData(x.toMulti()).status(201).encodeAsJsonArray(false).build();
        return rv;
    }

    @GET
    @Path("/custom-single")
    @Produces(MediaType.APPLICATION_JSON)
    public Uni<String> helloJsonSingle() {
        var x = Uni.createFrom().item("Hello from Quarkus REST in JSON");
        return x;
    }

    @GET
    @Path("/custom-multi")
    @Produces(MediaType.APPLICATION_JSON)
    public Multi<byte[]> helloMulti() {
        // var source = Multi.createFrom().ticks()
        // .every(Duration.ofMillis(1000))
        // .select()
        // .first(10)
        // .map(i -> {
        // if (i.intValue() == 9) {
        // throw new RuntimeException("Error at 9");
        // }
        // return ("\"Even number " + i + "\"").getBytes();
        // });
        var source = Multi.createFrom().<byte[]>emitter(emitter -> {
            emitter.emit(
                    IntStream.range(0, 10).mapToObj(i -> ("Even number " + i))
                            .collect(java.util.stream.Collectors.joining("")).getBytes());
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
            emitter.emit("Even number 1".getBytes());
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
            // emitter.fail(new Throwable("Error at 1"));
            emitter.complete();
        });
        var m = RestMulti.fromMultiData(source).encodeAsJsonArray(false).build();
        return m;

    }
}
