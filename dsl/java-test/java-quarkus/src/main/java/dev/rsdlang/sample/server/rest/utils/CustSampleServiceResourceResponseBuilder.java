package dev.rsdlang.sample.server.rest.utils;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

import dev.rsdlang.sample.server.Headers;
import dev.rsdlang.sample.server.rest.SampleServiceResourceResponseBuilder;
import dev.rsdlang.sample.server.service.model.SampleEnum;
import dev.rsdlang.sample.server.service.model.SimpleRecord.Data;
import jakarta.annotation.Priority;
import jakarta.enterprise.inject.Alternative;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.Response.ResponseBuilder;

@Singleton
@Alternative
@Priority(1)
public class CustSampleServiceResourceResponseBuilder extends SampleServiceResourceResponseBuilder {

	@Inject
	public Headers headers;

	@Override
	public ResponseBuilder getBoolean(boolean $result) {
		if (headers.unknownStatus) {
			return Response.status(400).entity("Sample Invalid response").type(MediaType.TEXT_PLAIN);
		} else if (headers.invalidData) {
			return Response.status(200).entity("123").type(MediaType.APPLICATION_JSON);
		} else if (headers.invalidEncodedData) {
			return Response.status(200).entity("This is not JSON").type(MediaType.APPLICATION_JSON);
		}
		return super.getBoolean($result);
	}

	@Override
	public ResponseBuilder getShort(short $result) {
		if (headers.invalidData) {
			return Response.status(200).entity("true").type(MediaType.APPLICATION_JSON);
		}
		return super.getShort($result);
	}

	@Override
	public ResponseBuilder getInt(int $result) {
		if (headers.invalidData) {
			return Response.status(200).entity("true").type(MediaType.APPLICATION_JSON);
		}
		return super.getInt($result);
	}

	@Override
	public ResponseBuilder getLong(long $result) {
		if (headers.invalidData) {
			return Response.status(200).entity("true").type(MediaType.APPLICATION_JSON);
		}
		return super.getLong($result);
	}

	@Override
	public ResponseBuilder getFloat(float $result) {
		if (headers.invalidData) {
			return Response.status(200).entity("true").type(MediaType.APPLICATION_JSON);
		}
		return super.getFloat($result);
	}

	@Override
	public ResponseBuilder getDouble(double $result) {
		if (headers.invalidData) {
			return Response.status(200).entity("true").type(MediaType.APPLICATION_JSON);
		}
		return super.getDouble($result);
	}

	@Override
	public ResponseBuilder getString(String $result) {
		if (headers.invalidData) {
			return Response.status(200).entity("true").type(MediaType.APPLICATION_JSON);
		}
		return super.getString($result);
	}

	@Override
	public ResponseBuilder getLocalDate(LocalDate $result) {
		if (headers.invalidData) {
			return Response.status(200).entity("true").type(MediaType.APPLICATION_JSON);
		}
		return super.getLocalDate($result);
	}

	@Override
	public ResponseBuilder getLocalDateTime(LocalDateTime $result) {
		if (headers.invalidData) {
			return Response.status(200).entity("true").type(MediaType.APPLICATION_JSON);
		}
		return super.getLocalDateTime($result);
	}

	@Override
	public ResponseBuilder getZonedDateTime(ZonedDateTime $result) {
		if (headers.invalidData) {
			return Response.status(200).entity("true").type(MediaType.APPLICATION_JSON);
		}
		return super.getZonedDateTime($result);
	}

	@Override
	public ResponseBuilder getScalar(ZoneId $result) {
		if (headers.invalidData) {
			return Response.status(200).entity("true").type(MediaType.APPLICATION_JSON);
		}
		return super.getScalar($result);
	}

	@Override
	public ResponseBuilder getEnum(SampleEnum $result) {
		if (headers.invalidData) {
			return Response.status(200).entity("true").type(MediaType.APPLICATION_JSON);
		}
		return super.getEnum($result);
	}

	@Override
	public ResponseBuilder getSimpleRecord(Data $result, String key) {
		if (headers.invalidData) {
			return Response.status(200).entity("true").type(MediaType.APPLICATION_JSON);
		}
		return super.getSimpleRecord($result, key);
	}
}
