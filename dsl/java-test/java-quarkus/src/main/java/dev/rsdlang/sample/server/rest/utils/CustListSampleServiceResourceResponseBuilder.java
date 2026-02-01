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
	public ResponseBuilder listBoolean(List<Boolean> $result) {
		if (headers.unknownStatus) {
			return Response.status(400).entity("Sample Invalid response").type(MediaType.TEXT_PLAIN);
		} else if (headers.invalidData) {
			return Response.status(200).entity("123").type(MediaType.APPLICATION_JSON);
		} else if (headers.invalidEncodedData) {
			return Response.status(200).entity("This is not JSON").type(MediaType.APPLICATION_JSON);
		}
		return super.listBoolean($result);
	}

	@Override
	public ResponseBuilder listShort(List<Short> $result) {
		if (headers.unknownStatus) {
			return Response.status(400).entity("Sample Invalid response").type(MediaType.TEXT_PLAIN);
		} else if (headers.invalidData) {
			return Response.status(200).entity("123").type(MediaType.APPLICATION_JSON);
		} else if (headers.invalidEncodedData) {
			return Response.status(200).entity("This is not JSON").type(MediaType.APPLICATION_JSON);
		}
		return super.listShort($result);
	}

	@Override
	public ResponseBuilder listInt(List<Integer> $result) {
		if (headers.unknownStatus) {
			return Response.status(400).entity("Sample Invalid response").type(MediaType.TEXT_PLAIN);
		} else if (headers.invalidData) {
			return Response.status(200).entity("123").type(MediaType.APPLICATION_JSON);
		} else if (headers.invalidEncodedData) {
			return Response.status(200).entity("This is not JSON").type(MediaType.APPLICATION_JSON);
		}
		return super.listInt($result);
	}

	@Override
	public ResponseBuilder listLong(List<Long> $result) {
		if (headers.unknownStatus) {
			return Response.status(400).entity("Sample Invalid response").type(MediaType.TEXT_PLAIN);
		} else if (headers.invalidData) {
			return Response.status(200).entity("123").type(MediaType.APPLICATION_JSON);
		} else if (headers.invalidEncodedData) {
			return Response.status(200).entity("This is not JSON").type(MediaType.APPLICATION_JSON);
		}
		return super.listLong($result);
	}

	@Override
	public ResponseBuilder listFloat(List<Float> $result) {
		if (headers.unknownStatus) {
			return Response.status(400).entity("Sample Invalid response").type(MediaType.TEXT_PLAIN);
		} else if (headers.invalidData) {
			return Response.status(200).entity("123").type(MediaType.APPLICATION_JSON);
		} else if (headers.invalidEncodedData) {
			return Response.status(200).entity("This is not JSON").type(MediaType.APPLICATION_JSON);
		}
		return super.listFloat($result);
	}

	@Override
	public ResponseBuilder listDouble(List<Double> $result) {
		if (headers.unknownStatus) {
			return Response.status(400).entity("Sample Invalid response").type(MediaType.TEXT_PLAIN);
		} else if (headers.invalidData) {
			return Response.status(200).entity("123").type(MediaType.APPLICATION_JSON);
		} else if (headers.invalidEncodedData) {
			return Response.status(200).entity("This is not JSON").type(MediaType.APPLICATION_JSON);
		}
		return super.listDouble($result);
	}

	@Override
	public ResponseBuilder listString(List<String> $result) {
		if (headers.unknownStatus) {
			return Response.status(400).entity("Sample Invalid response").type(MediaType.TEXT_PLAIN);
		} else if (headers.invalidData) {
			return Response.status(200).entity("123").type(MediaType.APPLICATION_JSON);
		} else if (headers.invalidEncodedData) {
			return Response.status(200).entity("This is not JSON").type(MediaType.APPLICATION_JSON);
		}
		return super.listString($result);
	}

	@Override
	public ResponseBuilder listLocalDate(List<java.time.LocalDate> $result) {
		if (headers.unknownStatus) {
			return Response.status(400).entity("Sample Invalid response").type(MediaType.TEXT_PLAIN);
		} else if (headers.invalidData) {
			return Response.status(200).entity("123").type(MediaType.APPLICATION_JSON);
		} else if (headers.invalidEncodedData) {
			return Response.status(200).entity("This is not JSON").type(MediaType.APPLICATION_JSON);
		}
		return super.listLocalDate($result);
	}

	@Override
	public ResponseBuilder listLocalDateTime(List<java.time.LocalDateTime> $result) {
		if (headers.unknownStatus) {
			return Response.status(400).entity("Sample Invalid response").type(MediaType.TEXT_PLAIN);
		} else if (headers.invalidData) {
			return Response.status(200).entity("123").type(MediaType.APPLICATION_JSON);
		} else if (headers.invalidEncodedData) {
			return Response.status(200).entity("This is not JSON").type(MediaType.APPLICATION_JSON);
		}
		return super.listLocalDateTime($result);
	}

	@Override
	public ResponseBuilder listZonedDateTime(List<java.time.ZonedDateTime> $result) {
		if (headers.unknownStatus) {
			return Response.status(400).entity("Sample Invalid response").type(MediaType.TEXT_PLAIN);
		} else if (headers.invalidData) {
			return Response.status(200).entity("123").type(MediaType.APPLICATION_JSON);
		} else if (headers.invalidEncodedData) {
			return Response.status(200).entity("This is not JSON").type(MediaType.APPLICATION_JSON);
		}
		return super.listZonedDateTime($result);
	}

	@Override
	public ResponseBuilder listScalar(List<java.time.ZoneId> $result) {
		if (headers.unknownStatus) {
			return Response.status(400).entity("Sample Invalid response").type(MediaType.TEXT_PLAIN);
		} else if (headers.invalidData) {
			return Response.status(200).entity("123").type(MediaType.APPLICATION_JSON);
		} else if (headers.invalidEncodedData) {
			return Response.status(200).entity("This is not JSON").type(MediaType.APPLICATION_JSON);
		}
		return super.listScalar($result);
	}

	@Override
	public ResponseBuilder listEnum(List<dev.rsdlang.sample.server.service.model.SampleEnum> $result) {
		if (headers.unknownStatus) {
			return Response.status(400).entity("Sample Invalid response").type(MediaType.TEXT_PLAIN);
		} else if (headers.invalidData) {
			return Response.status(200).entity("123").type(MediaType.APPLICATION_JSON);
		} else if (headers.invalidEncodedData) {
			return Response.status(200).entity("This is not JSON").type(MediaType.APPLICATION_JSON);
		}
		return super.listEnum($result);
	}

	@Override
	public ResponseBuilder listSimpleRecord(List<dev.rsdlang.sample.server.service.model.SimpleRecord.Data> $result) {
		if (headers.unknownStatus) {
			return Response.status(400).entity("Sample Invalid response").type(MediaType.TEXT_PLAIN);
		} else if (headers.invalidData) {
			return Response.status(200).entity("[{ \"a\": \"123\", \"b\": \"1\", \"c\": \"Sample Name\" }]")
					.type(MediaType.APPLICATION_JSON);
		} else if (headers.invalidEncodedData) {
			return Response.status(200).entity("This is not JSON").type(MediaType.APPLICATION_JSON);
		}
		return super.listSimpleRecord($result);
	}
}
