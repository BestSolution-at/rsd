package dev.rsdlang.sample.server;

import jakarta.enterprise.context.RequestScoped;

@RequestScoped
public class Headers {
	public boolean unknownStatus = false;
	public boolean invalidData = false;
	public boolean invalidEncodedData = false;
	public boolean error401 = false;
}
