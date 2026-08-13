package dev.rsdlang;

import java.util.concurrent.CountDownLatch;

import dev.rsdlang.sample.client.ListStreamingServiceService;
import dev.rsdlang.sample.client.jdkhttp.JDKSpecSamplesClient;

import java.io.IOException;
import java.net.URI;

public class Main {

	public static void main(String[] args) throws IOException, InterruptedException {
		var client = JDKSpecSamplesClient.builder()
				.baseURI(URI.create("http://localhost:3000"))
				.build();
		System.err.println(Thread.currentThread() + " - Starting streamRecord");
		CountDownLatch latch = new CountDownLatch(1);
		var service = client.service(ListStreamingServiceService.class);
		service.streamRecord((data, error, done) -> {
			System.err.println(Thread.currentThread() + " - In consumer");
			if (error != null) {
				System.err.println("Error: " + error);
			} else if (data != null) {
				System.out.println("Data: " + data);
			}
			if (done) {
				System.out.println("Done streaming");
				latch.countDown();
			}
		});
		latch.await();
	}
}
