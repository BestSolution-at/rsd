package dev.rsdlang.sample.server.rest.utils;

import java.util.List;

import dev.rsdlang.sample.server.Headers;
import dev.rsdlang.sample.server.rest.ListSampleServiceResourceResponseBuilder;
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
public class CustListSampleServiceResourceResponseBuilder extends ListSampleServiceResourceResponseBuilder {
	@Inject
	public Headers headers;

	@Override
	public ResponseBuilder listBoolean(List<Boolean> $result, String contentType) {
		if (headers.isUnknownStatus()) {
			return Response.status(400).entity("Sample Invalid response").type(MediaType.TEXT_PLAIN);
		} else if (headers.isInvalidData()) {
			return Response.status(200).entity("123").type(MediaType.APPLICATION_JSON);
		} else if (headers.isInvalidEncodedData()) {
			return Response.status(200).entity("This is not JSON").type(MediaType.APPLICATION_JSON);
		}
		return super.listBoolean($result, contentType);
	}

	@Override
	public ResponseBuilder listShort(List<Short> $result, String contentType) {
		if (headers.isUnknownStatus()) {
			return Response.status(400).entity("Sample Invalid response").type(MediaType.TEXT_PLAIN);
		} else if (headers.isInvalidData()) {
			return Response.status(200).entity("123").type(MediaType.APPLICATION_JSON);
		} else if (headers.isInvalidEncodedData()) {
			return Response.status(200).entity("This is not JSON").type(MediaType.APPLICATION_JSON);
		}
		return super.listShort($result, contentType);
	}

	@Override
	public ResponseBuilder listInt(List<Integer> $result, String contentType) {
		if (headers.isUnknownStatus()) {
			return Response.status(400).entity("Sample Invalid response").type(MediaType.TEXT_PLAIN);
		} else if (headers.isInvalidData()) {
			return Response.status(200).entity("123").type(MediaType.APPLICATION_JSON);
		} else if (headers.isInvalidEncodedData()) {
			return Response.status(200).entity("This is not JSON").type(MediaType.APPLICATION_JSON);
		}
		return super.listInt($result, contentType);
	}

	@Override
	public ResponseBuilder listLong(List<Long> $result, String contentType) {
		if (headers.isUnknownStatus()) {
			return Response.status(400).entity("Sample Invalid response").type(MediaType.TEXT_PLAIN);
		} else if (headers.isInvalidData()) {
			return Response.status(200).entity("123").type(MediaType.APPLICATION_JSON);
		} else if (headers.isInvalidEncodedData()) {
			return Response.status(200).entity("This is not JSON").type(MediaType.APPLICATION_JSON);
		}
		return super.listLong($result, contentType);
	}

	@Override
	public ResponseBuilder listFloat(List<Float> $result, String contentType) {
		if (headers.isUnknownStatus()) {
			return Response.status(400).entity("Sample Invalid response").type(MediaType.TEXT_PLAIN);
		} else if (headers.isInvalidData()) {
			return Response.status(200).entity("123").type(MediaType.APPLICATION_JSON);
		} else if (headers.isInvalidEncodedData()) {
			return Response.status(200).entity("This is not JSON").type(MediaType.APPLICATION_JSON);
		}
		return super.listFloat($result, contentType);
	}

	@Override
	public ResponseBuilder listDouble(List<Double> $result, String contentType) {
		if (headers.isUnknownStatus()) {
			return Response.status(400).entity("Sample Invalid response").type(MediaType.TEXT_PLAIN);
		} else if (headers.isInvalidData()) {
			return Response.status(200).entity("123").type(MediaType.APPLICATION_JSON);
		} else if (headers.isInvalidEncodedData()) {
			return Response.status(200).entity("This is not JSON").type(MediaType.APPLICATION_JSON);
		}
		return super.listDouble($result, contentType);
	}

	@Override
	public ResponseBuilder listString(List<String> $result, String contentType) {
		if (headers.isUnknownStatus()) {
			return Response.status(400).entity("Sample Invalid response").type(MediaType.TEXT_PLAIN);
		} else if (headers.isInvalidData()) {
			return Response.status(200).entity("123").type(MediaType.APPLICATION_JSON);
		} else if (headers.isInvalidEncodedData()) {
			return Response.status(200).entity("This is not JSON").type(MediaType.APPLICATION_JSON);
		}
		return super.listString($result, contentType);
	}

	@Override
	public ResponseBuilder listLocalDate(List<java.time.LocalDate> $result, String contentType) {
		if (headers.isUnknownStatus()) {
			return Response.status(400).entity("Sample Invalid response").type(MediaType.TEXT_PLAIN);
		} else if (headers.isInvalidData()) {
			return Response.status(200).entity("123").type(MediaType.APPLICATION_JSON);
		} else if (headers.isInvalidEncodedData()) {
			return Response.status(200).entity("This is not JSON").type(MediaType.APPLICATION_JSON);
		}
		return super.listLocalDate($result, contentType);
	}

	@Override
	public ResponseBuilder listLocalDateTime(List<java.time.LocalDateTime> $result, String contentType) {
		if (headers.isUnknownStatus()) {
			return Response.status(400).entity("Sample Invalid response").type(MediaType.TEXT_PLAIN);
		} else if (headers.isInvalidData()) {
			return Response.status(200).entity("123").type(MediaType.APPLICATION_JSON);
		} else if (headers.isInvalidEncodedData()) {
			return Response.status(200).entity("This is not JSON").type(MediaType.APPLICATION_JSON);
		}
		return super.listLocalDateTime($result, contentType);
	}

	@Override
	public ResponseBuilder listLocalTime(List<java.time.LocalTime> $result, String contentType) {
		if (headers.isUnknownStatus()) {
			return Response.status(400).entity("Sample Invalid response").type(MediaType.TEXT_PLAIN);
		} else if (headers.isInvalidData()) {
			return Response.status(200).entity("123").type(MediaType.APPLICATION_JSON);
		} else if (headers.isInvalidEncodedData()) {
			return Response.status(200).entity("This is not JSON").type(MediaType.APPLICATION_JSON);
		}
		return super.listLocalTime($result, contentType);
	}

	@Override
	public ResponseBuilder listOffsetDateTime(List<java.time.OffsetDateTime> $result, String contentType) {
		if (headers.isUnknownStatus()) {
			return Response.status(400).entity("Sample Invalid response").type(MediaType.TEXT_PLAIN);
		} else if (headers.isInvalidData()) {
			return Response.status(200).entity("123").type(MediaType.APPLICATION_JSON);
		} else if (headers.isInvalidEncodedData()) {
			return Response.status(200).entity("This is not JSON").type(MediaType.APPLICATION_JSON);
		}
		return super.listOffsetDateTime($result, contentType);
	}

	@Override
	public ResponseBuilder listZonedDateTime(List<java.time.ZonedDateTime> $result, String contentType) {
		if (headers.isUnknownStatus()) {
			return Response.status(400).entity("Sample Invalid response").type(MediaType.TEXT_PLAIN);
		} else if (headers.isInvalidData()) {
			return Response.status(200).entity("123").type(MediaType.APPLICATION_JSON);
		} else if (headers.isInvalidEncodedData()) {
			return Response.status(200).entity("This is not JSON").type(MediaType.APPLICATION_JSON);
		}
		return super.listZonedDateTime($result, contentType);
	}

	@Override
	public ResponseBuilder listScalar(List<java.time.ZoneId> $result, String contentType) {
		if (headers.isUnknownStatus()) {
			return Response.status(400).entity("Sample Invalid response").type(MediaType.TEXT_PLAIN);
		} else if (headers.isInvalidData()) {
			return Response.status(200).entity("123").type(MediaType.APPLICATION_JSON);
		} else if (headers.isInvalidEncodedData()) {
			return Response.status(200).entity("This is not JSON").type(MediaType.APPLICATION_JSON);
		}
		return super.listScalar($result, contentType);
	}

	@Override
	public ResponseBuilder listEnum(List<dev.rsdlang.sample.server.service.model.SampleEnum> $result,
			String contentType) {
		if (headers.isUnknownStatus()) {
			return Response.status(400).entity("Sample Invalid response").type(MediaType.TEXT_PLAIN);
		} else if (headers.isInvalidData()) {
			return Response.status(200).entity("123").type(MediaType.APPLICATION_JSON);
		} else if (headers.isInvalidEncodedData()) {
			return Response.status(200).entity("This is not JSON").type(MediaType.APPLICATION_JSON);
		}
		return super.listEnum($result, contentType);
	}

	@Override
	public ResponseBuilder listSimpleRecord(List<dev.rsdlang.sample.server.service.model.SimpleRecord.Data> $result,
			String contentType) {
		if (headers.isUnknownStatus()) {
			return Response.status(400).entity("Sample Invalid response").type(MediaType.TEXT_PLAIN);
		} else if (headers.isInvalidData()) {
			return Response.status(200).entity("[{ \"a\": \"123\", \"b\": \"1\", \"c\": \"Sample Name\" }]")
					.type(MediaType.APPLICATION_JSON);
		} else if (headers.isInvalidEncodedData()) {
			return Response.status(200).entity("This is not JSON").type(MediaType.APPLICATION_JSON);
		}
		return super.listSimpleRecord($result, contentType);
	}
}
