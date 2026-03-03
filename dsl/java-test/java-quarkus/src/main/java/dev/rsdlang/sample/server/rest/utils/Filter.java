package dev.rsdlang.sample.server.rest.utils;

import org.jboss.resteasy.reactive.server.ServerRequestFilter;

import dev.rsdlang.sample.server.Headers;
import jakarta.inject.Inject;
import jakarta.ws.rs.container.ContainerRequestContext;

public class Filter {

	@Inject
	private Headers headers;

	@ServerRequestFilter
	public void filter(ContainerRequestContext requestContext) {
		// System.err.println(requestContext.getHeaders());
		headers.setUnknownStatus("true".equalsIgnoreCase(requestContext.getHeaders().getFirst("X-Fail-Unknown-Status")));
		headers.setInvalidData("true".equalsIgnoreCase(requestContext.getHeaders().getFirst("X-Fail-Invalid-Data")));
		headers.setInvalidEncodedData("true"
				.equalsIgnoreCase(requestContext.getHeaders().getFirst("X-Fail-Invalid-Encoded-Data")));
		headers.setError401("true".equalsIgnoreCase(requestContext.getHeaders().getFirst("x-with-status-401")));
	}
}
