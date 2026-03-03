package dev.rsdlang.sample.server;

import jakarta.enterprise.context.RequestScoped;

@RequestScoped
public class Headers {
	private Boolean unknownStatus;
	private Boolean invalidData;
	private Boolean invalidEncodedData;
	private Boolean error401;

	public boolean isUnknownStatus() {
		return unknownStatus != null && unknownStatus;
	}

	public void setUnknownStatus(boolean unknownStatus) {
		if (this.unknownStatus != null) {
			System.err.println("RESET UNKNOWN STATUS");
		}
		this.unknownStatus = unknownStatus;
	}

	public boolean isInvalidData() {
		return invalidData != null && invalidData;
	}

	public void setInvalidData(boolean invalidData) {
		if (this.invalidData != null) {
			System.err.println("RESET INVALID DATA");
		}
		this.invalidData = invalidData;
	}

	public boolean isInvalidEncodedData() {
		return invalidEncodedData != null && invalidEncodedData;
	}

	public void setInvalidEncodedData(boolean invalidEncodedData) {
		if (this.invalidEncodedData != null) {
			System.err.println("RESET INVALID ENCODED DATA");
		}
		this.invalidEncodedData = invalidEncodedData;
	}

	public boolean isError401() {
		return error401 != null && error401;
	}

	public void setError401(boolean error401) {
		if (this.error401 != null) {
			System.err.println("RESET ERROR 401!");
		}
		this.error401 = error401;
	}
}
