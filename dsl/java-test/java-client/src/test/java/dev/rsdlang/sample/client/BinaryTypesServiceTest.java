package dev.rsdlang.sample.client;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.io.IOException;
import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.util.List;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;

import dev.rsdlang.sample.client.jdkhttp.JDKSpecSamplesClient;
import dev.rsdlang.sample.client.jdkhttp.JDKSpecSamplesClient.ContentTypeEncoding;
import dev.rsdlang.sample.client.model.RSDBlob;
import dev.rsdlang.sample.client.model.RSDFile;
import dev.rsdlang.sample.client.model.SimpleRecord;

public class BinaryTypesServiceTest {

	static BinaryTypesService[] serviceProvider() {
		var baseBuilder = JDKSpecSamplesClient.builder().baseURI(URI.create("http://localhost:3000"));
		var JSON = baseBuilder.build();
		var MSGPACK = baseBuilder.contentTypeEncoding(ContentTypeEncoding.APPLICATION_VND_MSGPACK).build();
		return new BinaryTypesService[] {
				JSON.service(BinaryTypesService.class),
				MSGPACK.service(BinaryTypesService.class),
		};
	}

	private static RSDFile file(BinaryTypesService service, String content) throws IOException {
		var tmp = Files.createTempFile("test", ".txt");
		Files.writeString(tmp, content);
		tmp.toFile().deleteOnExit();
		return service.client().createFile(tmp, "text/plain", tmp.getFileName().toString());
	}

	private static RSDBlob blob(BinaryTypesService service, String content) throws IOException {
		var tmp = Files.createTempFile("test", ".bin");
		Files.writeString(tmp, content);
		tmp.toFile().deleteOnExit();
		return service.client().createBlob(tmp, "application/octet-stream");
	}

	// --- Upload File ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void uploadFile(BinaryTypesService service) throws IOException {
		assertEquals(5, service.uploadFile(file(service, "Hello")));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void uploadFileOpt_undefined(BinaryTypesService service) {
		assertEquals(0, service.uploadFileOpt());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void uploadFileOpt_defined(BinaryTypesService service) throws IOException {
		assertEquals(5, service.uploadFileOpt(file(service, "Hello")));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void uploadFileNil_null(BinaryTypesService service) {
		assertEquals(-1, service.uploadFileNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void uploadFileNil_defined(BinaryTypesService service) throws IOException {
		assertEquals(5, service.uploadFileNil(file(service, "Hello")));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void uploadFileOptNil_undefined(BinaryTypesService service) {
		assertEquals(0, service.uploadFileOptNil());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void uploadFileOptNil_null(BinaryTypesService service) {
		assertEquals(-1, service.uploadFileOptNil((RSDFile) null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void uploadFileOptNil_defined(BinaryTypesService service) throws IOException {
		assertEquals(5, service.uploadFileOptNil(file(service, "Hello")));
	}

	// --- Upload Blob ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void uploadBlob(BinaryTypesService service) throws IOException {
		assertEquals(5, service.uploadBlob(blob(service, "Hello")));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void uploadBlobOpt_undefined(BinaryTypesService service) {
		assertEquals(0, service.uploadBlobOpt());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void uploadBlobOpt_defined(BinaryTypesService service) throws IOException {
		assertEquals(5, service.uploadBlobOpt(blob(service, "Hello")));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void uploadBlobNil_null(BinaryTypesService service) {
		assertEquals(-1, service.uploadBlobNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void uploadBlobNil_defined(BinaryTypesService service) throws IOException {
		assertEquals(5, service.uploadBlobNil(blob(service, "Hello")));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void uploadBlobOptNil_undefined(BinaryTypesService service) {
		assertEquals(0, service.uploadBlobOptNil());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void uploadBlobOptNil_null(BinaryTypesService service) {
		assertEquals(-1, service.uploadBlobOptNil((RSDBlob) null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void uploadBlobOptNil_defined(BinaryTypesService service) throws IOException {
		assertEquals(5, service.uploadBlobOptNil(blob(service, "Hello")));
	}

	// --- Upload File List ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void uploadFileList(BinaryTypesService service) throws IOException {
		assertEquals(10, service.uploadFileList(List.of(file(service, "Hello"), file(service, "World"))));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void uploadFileListOpt_undefined(BinaryTypesService service) {
		assertEquals(0, service.uploadFileListOpt());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void uploadFileListOpt_defined(BinaryTypesService service) throws IOException {
		assertEquals(10, service.uploadFileListOpt(List.of(file(service, "Hello"), file(service, "World"))));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void uploadFileListNil_null(BinaryTypesService service) {
		assertEquals(-1, service.uploadFileListNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void uploadFileListNil_defined(BinaryTypesService service) throws IOException {
		assertEquals(10, service.uploadFileListNil(List.of(file(service, "Hello"), file(service, "World"))));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void uploadFileListOptNil_undefined(BinaryTypesService service) {
		assertEquals(0, service.uploadFileListOptNil());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void uploadFileListOptNil_null(BinaryTypesService service) {
		assertEquals(-1, service.uploadFileListOptNil((List<RSDFile>) null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void uploadFileListOptNil_defined(BinaryTypesService service) throws IOException {
		assertEquals(10, service.uploadFileListOptNil(List.of(file(service, "Hello"), file(service, "World"))));
	}

	// --- Upload Blob List ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void uploadBlobList(BinaryTypesService service) throws IOException {
		assertEquals(10, service.uploadBlobList(List.of(blob(service, "Hello"), blob(service, "World"))));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void uploadBlobListOpt_undefined(BinaryTypesService service) {
		assertEquals(0, service.uploadBlobListOpt());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void uploadBlobListOpt_defined(BinaryTypesService service) throws IOException {
		assertEquals(10, service.uploadBlobListOpt(List.of(blob(service, "Hello"), blob(service, "World"))));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void uploadBlobListNil_null(BinaryTypesService service) {
		assertEquals(-1, service.uploadBlobListNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void uploadBlobListNil_defined(BinaryTypesService service) throws IOException {
		assertEquals(10, service.uploadBlobListNil(List.of(blob(service, "Hello"), blob(service, "World"))));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void uploadBlobListOptNil_undefined(BinaryTypesService service) {
		assertEquals(0, service.uploadBlobListOptNil());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void uploadBlobListOptNil_null(BinaryTypesService service) {
		assertEquals(-1, service.uploadBlobListOptNil((List<RSDBlob>) null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void uploadBlobListOptNil_defined(BinaryTypesService service) throws IOException {
		assertEquals(10, service.uploadBlobListOptNil(List.of(blob(service, "Hello"), blob(service, "World"))));
	}

	// --- Upload Mixed ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void uploadMixed(BinaryTypesService service) throws IOException {
		var rec = service.client().builder(SimpleRecord.DataBuilder.class).key("k").version("1").value("v").build();
		var result = service.uploadMixed(
				"hello", 42, rec,
				List.of("a", "b"), List.of(1, 2), List.of(rec),
				file(service, "FileContent"), blob(service, "BlobContent"));
		assertEquals("hello", result.text().orElse(null));
		assertEquals(42, result.number().orElse(null));
		assertEquals("k", result.rec().toOptional().map(SimpleRecord.Data::key).orElse(""));
		assertEquals(List.of("a", "b"), result.textList().orElse(null));
		assertEquals(List.of(1, 2), result.numberList().orElse(null));
		assertEquals(1, result.recList().toOptional().map(List::size).orElse(0));
		assertEquals("FileContent", result.dataFileContent().orElse(null));
		assertEquals("BlobContent", result.dataBlobContent().orElse(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void uploadMixedOpt_allUndefined(BinaryTypesService service) {
		var result = service.uploadMixedOpt();
		assertEquals(true, result.text().isUndefined());
		assertEquals(true, result.number().isUndefined());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void uploadMixedOpt_allDefined(BinaryTypesService service) throws IOException {
		var rec = service.client().builder(SimpleRecord.DataBuilder.class).key("k").version("1").value("v").build();
		var result = service.uploadMixedOpt(
				"hello", 42, rec,
				List.of("a", "b"), List.of(1, 2), List.of(rec),
				file(service, "FileContent"), blob(service, "BlobContent"));
		assertEquals("hello", result.text().orElse(null));
		assertEquals(42, result.number().orElse(null));
		assertEquals("k", result.rec().map(SimpleRecord.Data::key).orElse(""));
		assertEquals(List.of("a", "b"), result.textList().orElse(null));
		assertEquals(List.of(1, 2), result.numberList().orElse(null));
		assertEquals(1, result.recList().map(List::size).orElse(0));
		assertEquals("FileContent", result.dataFileContent().orElse(null));
		assertEquals("BlobContent", result.dataBlobContent().orElse(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void uploadMixedNil_allNull(BinaryTypesService service) {
		var result = service.uploadMixedNil(null, null, null, null, null, null, null, null);
		assertEquals(true, result.text().isNull());
		assertEquals(true, result.number().isNull());
		assertEquals(true, result.rec().isNull());
		assertEquals(true, result.textList().isNull());
		assertEquals(true, result.numberList().isNull());
		assertEquals(true, result.recList().isNull());
		assertEquals(true, result.dataFileContent().isNull());
		assertEquals(true, result.dataBlobContent().isNull());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void uploadMixedNil_allDefined(BinaryTypesService service) throws IOException {
		var rec = service.client().builder(SimpleRecord.DataBuilder.class).key("k").version("1").value("v").build();
		var result = service.uploadMixedNil(
				"hello", 42, rec,
				List.of("a", "b"), List.of(1, 2), List.of(rec),
				file(service, "FileContent"), blob(service, "BlobContent"));
		assertEquals("hello", result.text().orElse(null));
		assertEquals(42, result.number().orElse(null));
		assertEquals("k", result.rec().map(SimpleRecord.Data::key).orElse(""));
		assertEquals(List.of("a", "b"), result.textList().orElse(null));
		assertEquals(List.of(1, 2), result.numberList().orElse(null));
		assertEquals(1, result.recList().map(List::size).orElse(0));
		assertEquals("FileContent", result.dataFileContent().orElse(null));
		assertEquals("BlobContent", result.dataBlobContent().orElse(null));
	}

	// --- Download ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void downloadFile(BinaryTypesService service) throws IOException {
		var result = service.downloadFile();
		assertEquals("Hello, World!", new String(result.stream().readAllBytes(), StandardCharsets.UTF_8));
		assertEquals("hello.txt", result.filename());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void downloadBlob(BinaryTypesService service) throws IOException {
		var result = service.downloadBlob();
		assertEquals("Hello, Blob!", new String(result.stream().readAllBytes(), StandardCharsets.UTF_8));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void singleBodyAddition(BinaryTypesService service) throws IOException {
		var result = service.singleBodyAddition("Hello, ", blob(service, "Blob!"));
		assertEquals("Hello, Blob!", result);
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void twoBinariesAddition(BinaryTypesService service) throws IOException {
		var result = service.twoBinariesAddition(blob(service, "Hello, "), file(service, "World!"));
		assertEquals(List.of(7, 6), result);
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void mixed(BinaryTypesService service) throws IOException {
		var rec = service.client().builder(SimpleRecord.DataBuilder.class).key("k").version("1").value("v").build();
		var result = service.mixed(
				"path",
				42,
				"header",
				24,
				rec,
				"query",
				84,
				rec,
				blob(service, "BlobContent"));
		assertEquals("path", result.pathString());
		assertEquals(42, result.pathNumber());

		assertEquals("header", result.headerString());
		assertEquals(24, result.headerNumber());
		assertEquals("k", result.headerRecord().key());

		assertEquals("query", result.queryString());
		assertEquals(84, result.queryNumber());
		assertEquals("k", result.queryRecord().key());

		assertEquals(11, result.dataBlob());
	}
}
