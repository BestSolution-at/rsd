package dev.rsdlang;

import java.util.Arrays;
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
	@Path("/uni")
	@Produces(MediaType.APPLICATION_JSON)
	public Uni<String> helloUni() {
		return Uni.createFrom().item("Hello from Quarkus REST");
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
			/*
			 * var w = new byte[16382];
			 * Arrays.fill(w, (byte) 'A');
			 * emitter.emit(w);
			 */

			// var x = new byte[16383];
			// Arrays.fill(x, (byte) 'A');
			// x[16380] = '!';
			// x[16381] = '\r';
			// x[16382] = '\n';
			// emitter.emit(x);

			// var y = new byte[16384];
			// Arrays.fill(y, (byte) 'A');
			// y[16381] = '!';
			// y[16382] = '\r';
			// y[16383] = '\n';
			// emitter.emit(y);

			// emitter.emit("Even number \n".repeat(2000).getBytes());
			emitter.emit("\"A\"".getBytes());

			try {
				Thread.sleep(1000);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

			emitter.emit("\"B\"".getBytes());
			// emitter.emit("A".getBytes());
			// emitter.emit("A".getBytes());
			try {
				Thread.sleep(1000);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			// emitter.fail(new Throwable("Error at 1"));
			emitter.complete();
		});
		var m = RestMulti.fromMultiData(source.onFailure().recoverWithItem(t -> "Error".getBytes()))
				.encodeAsJsonArray(false).build();
		return m;

	}
}
