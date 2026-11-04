package dev.rsdlang.sample.client.model;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;

import dev.rsdlang.sample.client.model.impl.avro._AvroSchema;
import dev.rsdlang.sample.client.model.impl.avro._AvroSchema.AvroTypes;

public class TreeNode_DataTest extends BaseTest {
	static TreeNode.Data createAvroRecord() {
		var schema = _AvroSchema.getInstance().getTypeSchema(AvroTypes.TreeNode);
		var record = readAvroFile("TreeNode.Data.avro", schema);
		return dev.rsdlang.sample.client.model.impl.avro.TreeNodeDataImpl.of(record);
	}

	static TreeNode.Data createJsonRecord() {
		var record = readJsonFile("TreeNode.Data.json");
		return dev.rsdlang.sample.client.model.impl.json.TreeNodeDataImpl.of(record);
	}

	static TreeNode.Data[] getRecords() {
		return new TreeNode.Data[] {
				createAvroRecord(),
				createJsonRecord()
		};
	}

	@ParameterizedTest
	@MethodSource("getRecords")
	void value(TreeNode.Data record) {
		assertEquals("Root", record.value());
	}

	@ParameterizedTest
	@MethodSource("getRecords")
	void children(TreeNode.Data record) {
		assertEquals(2, record.children().size());
		assertEquals("Child A", record.children().get(0).value());
		assertEquals("Child B", record.children().get(1).value());
	}
}
