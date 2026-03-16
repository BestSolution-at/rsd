package dev.rsdlang.sample.client;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.io.IOException;
import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.util.List;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;

import dev.rsdlang.sample.client.jdkhttp.JDKSpecSamplesClient;
import dev.rsdlang.sample.client.model.RSDBlob;
import dev.rsdlang.sample.client.model.RSDFile;
import dev.rsdlang.sample.client.model.SimpleRecord;

public class BinaryTypesServiceTest {

	private static final SpecSamplesClient CLIENT = JDKSpecSamplesClient.create(URI.create("http://localhost:3000"));

	static BinaryTypesService[] serviceProvider() {
		return new BinaryTypesService[] {
				CLIENT.service(BinaryTypesService.class),
		};
	}

	private static RSDFile file(String content) throws IOException {
		var tmp = Files.createTempFile("test", ".txt");
		Files.writeString(tmp, content);
		tmp.toFile().deleteOnExit();
		return CLIENT.creatFile(tmp, "text/plain", tmp.getFileName().toString());
	}

	private static RSDBlob blob(String content) throws IOException {
		var tmp = Files.createTempFile("test", ".bin");
		Files.writeString(tmp, content);
		tmp.toFile().deleteOnExit();
		return CLIENT.creatBlob(tmp, "application/octet-stream");
	}

	// --- Upload File ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void uploadFile(BinaryTypesService service) throws IOException {
		assertEquals(5, service.uploadFile(file("Hello")));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void uploadFileOpt_undefined(BinaryTypesService service) {
		assertEquals(0, service.uploadFileOpt());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void uploadFileOpt_defined(BinaryTypesService service) throws IOException {
		assertEquals(5, service.uploadFileOpt(file("Hello")));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void uploadFileNil_null(BinaryTypesService service) {
		assertEquals(-1, service.uploadFileNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void uploadFileNil_defined(BinaryTypesService service) throws IOException {
		assertEquals(5, service.uploadFileNil(file("Hello")));
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
		assertEquals(5, service.uploadFileOptNil(file("Hello")));
	}

	// --- Upload Blob ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void uploadBlob(BinaryTypesService service) throws IOException {
		assertEquals(5, service.uploadBlob(blob("Hello")));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void uploadBlobOpt_undefined(BinaryTypesService service) {
		assertEquals(0, service.uploadBlobOpt());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void uploadBlobOpt_defined(BinaryTypesService service) throws IOException {
		assertEquals(5, service.uploadBlobOpt(blob("Hello")));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void uploadBlobNil_null(BinaryTypesService service) {
		assertEquals(-1, service.uploadBlobNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void uploadBlobNil_defined(BinaryTypesService service) throws IOException {
		assertEquals(5, service.uploadBlobNil(blob("Hello")));
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
		assertEquals(5, service.uploadBlobOptNil(blob("Hello")));
	}

	// --- Upload File List ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void uploadFileList(BinaryTypesService service) throws IOException {
		assertEquals(10, service.uploadFileList(List.of(file("Hello"), file("World"))));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void uploadFileListOpt_undefined(BinaryTypesService service) {
		assertEquals(0, service.uploadFileListOpt());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void uploadFileListOpt_defined(BinaryTypesService service) throws IOException {
		assertEquals(10, service.uploadFileListOpt(List.of(file("Hello"), file("World"))));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void uploadFileListNil_null(BinaryTypesService service) {
		assertEquals(-1, service.uploadFileListNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void uploadFileListNil_defined(BinaryTypesService service) throws IOException {
		assertEquals(10, service.uploadFileListNil(List.of(file("Hello"), file("World"))));
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
		assertEquals(10, service.uploadFileListOptNil(List.of(file("Hello"), file("World"))));
	}

	// --- Upload Blob List ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void uploadBlobList(BinaryTypesService service) throws IOException {
		assertEquals(10, service.uploadBlobList(List.of(blob("Hello"), blob("World"))));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void uploadBlobListOpt_undefined(BinaryTypesService service) {
		assertEquals(0, service.uploadBlobListOpt());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void uploadBlobListOpt_defined(BinaryTypesService service) throws IOException {
		assertEquals(10, service.uploadBlobListOpt(List.of(blob("Hello"), blob("World"))));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void uploadBlobListNil_null(BinaryTypesService service) {
		assertEquals(-1, service.uploadBlobListNil(null));
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void uploadBlobListNil_defined(BinaryTypesService service) throws IOException {
		assertEquals(10, service.uploadBlobListNil(List.of(blob("Hello"), blob("World"))));
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
		assertEquals(10, service.uploadBlobListOptNil(List.of(blob("Hello"), blob("World"))));
	}

	// --- Upload Mixed ---

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void uploadMixed(BinaryTypesService service) throws IOException {
		var rec = CLIENT.builder(SimpleRecord.DataBuilder.class).key("k").version("1").value("v").build();
		var result = service.uploadMixed(
				"hello", 42, rec,
				List.of("a", "b"), List.of(1, 2), List.of(rec),
				file("FileContent"), blob("BlobContent"));
		assertEquals("hello", result.text());
		assertEquals(42, result.number());
		assertEquals("k", result.rec().key());
		assertEquals(List.of("a", "b"), result.textList());
		assertEquals(List.of(1, 2), result.numberList());
		assertEquals(1, result.recList().size());
		assertEquals("FileContent", result.dataFileContent());
		assertEquals("BlobContent", result.dataBlobContent());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void uploadMixedOpt_allUndefined(BinaryTypesService service) {
		var result = service.uploadMixedOpt();
		assertEquals(null, result.text());
		// FIXME
		// assertEquals(null, result.number());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void uploadMixedOpt_allDefined(BinaryTypesService service) throws IOException {
		var rec = CLIENT.builder(SimpleRecord.DataBuilder.class).key("k").version("1").value("v").build();
		var result = service.uploadMixedOpt(
				"hello", 42, rec,
				List.of("a", "b"), List.of(1, 2), List.of(rec),
				file("FileContent"), blob("BlobContent"));
		assertEquals("hello", result.text());
		assertEquals(42, result.number());
		assertEquals("k", result.rec().key());
		assertEquals(List.of("a", "b"), result.textList());
		assertEquals(List.of(1, 2), result.numberList());
		assertEquals(1, result.recList().size());
		assertEquals("FileContent", result.dataFileContent());
		assertEquals("BlobContent", result.dataBlobContent());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void uploadMixedNil_allNull(BinaryTypesService service) {
		var result = service.uploadMixedNil(null, null, null, null, null, null, null, null);
		assertEquals(null, result.text());
		// FIXME
		// assertEquals(null, result.number());
		assertEquals(null, result.rec());
		assertEquals(null, result.textList());
		assertEquals(null, result.numberList());
		assertEquals(null, result.recList());
		assertEquals(null, result.dataFileContent());
		assertEquals(null, result.dataBlobContent());
	}

	@ParameterizedTest
	@MethodSource("serviceProvider")
	public void uploadMixedNil_allDefined(BinaryTypesService service) throws IOException {
		var rec = CLIENT.builder(SimpleRecord.DataBuilder.class).key("k").version("1").value("v").build();
		var result = service.uploadMixedNil(
				"hello", 42, rec,
				List.of("a", "b"), List.of(1, 2), List.of(rec),
				file("FileContent"), blob("BlobContent"));
		assertEquals("hello", result.text());
		assertEquals(42, result.number());
		assertEquals("k", result.rec().key());
		assertEquals(List.of("a", "b"), result.textList());
		assertEquals(List.of(1, 2), result.numberList());
		assertEquals(1, result.recList().size());
		assertEquals("FileContent", result.dataFileContent());
		assertEquals("BlobContent", result.dataBlobContent());
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

}
