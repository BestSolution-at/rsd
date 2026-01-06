package at.bestsolution;

import java.io.IOException;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.Collection;
import java.util.Collections;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.ListIterator;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.msgpack.core.MessageBufferPacker;
import org.msgpack.core.MessageUnpacker;
import org.msgpack.value.Value;
import org.msgpack.value.NumberValue;
import org.msgpack.value.StringValue;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonNumber;
import jakarta.json.JsonObject;
import jakarta.json.JsonString;
import jakarta.json.JsonValue;
import jakarta.json.stream.JsonGenerator;

public class Main {
	static abstract class MsgJsonValue<T extends Value> implements JsonValue {
		protected final T value;

		MsgJsonValue(T value) {
			this.value = value;
		}
	}

	static class MsgJsonString extends MsgJsonValue<StringValue> implements JsonString {

		MsgJsonString(StringValue value) {
			super(value);
		}

		@Override
		public ValueType getValueType() {
			return ValueType.STRING;
		}

		@Override
		public String getString() {
			return value.asString();
		}

		@Override
		public CharSequence getChars() {
			return value.asString();
		}
	}

	static class MsgJsonNumber extends MsgJsonValue<NumberValue> implements jakarta.json.JsonNumber {

		MsgJsonNumber(NumberValue value) {
			super(value);
		}

		@Override
		public ValueType getValueType() {
			return ValueType.NUMBER;
		}

		@Override
		public boolean isIntegral() {
			return value.isIntegerValue();
		}

		@Override
		public int intValue() {
			return value.asIntegerValue().toInt();
		}

		@Override
		public int intValueExact() {
			return value.asIntegerValue().toInt();
		}

		@Override
		public long longValue() {
			return value.asIntegerValue().toLong();
		}

		@Override
		public long longValueExact() {
			return value.asIntegerValue().toLong();
		}

		@Override
		public double doubleValue() {
			return value.asFloatValue().toDouble();
		}

		@Override
		public String toString() {
			return value.toString();
		}

		@Override
		public BigDecimal bigDecimalValue() {
			return BigDecimal.valueOf(value.asFloatValue().toDouble());
		}

		@Override
		public BigInteger bigIntegerValue() {
			return value.asIntegerValue().toBigInteger();
		}

		@Override
		public BigInteger bigIntegerValueExact() {
			return value.asIntegerValue().toBigInteger();
		}
	}

	class MsgJsonObject extends MsgJsonValue<org.msgpack.value.MapValue> implements JsonObject {
		private Map<String, JsonValue> map;

		MsgJsonObject(org.msgpack.value.MapValue value) {
			super(value);
			this.map = Collections.unmodifiableMap(value.asMapValue().entrySet().stream()
					.collect(
							Collectors.toMap(e -> e.getKey().asStringValue().toString(), e -> decodeJson(e.getValue()),
									(a, b) -> b, LinkedHashMap::new)));
		}

		@Override
		public ValueType getValueType() {
			return ValueType.OBJECT;
		}

		@Override
		public int size() {
			return map.size();
		}

		@Override
		public void clear() {
			throw new UnsupportedOperationException();
		}

		@Override
		public boolean containsKey(Object key) {
			return map.containsKey(key);
		}

		@Override
		public boolean containsValue(Object value) {
			return map.containsValue(value);
		}

		@Override
		public Set<Entry<String, JsonValue>> entrySet() {
			return map.entrySet();
		}

		@Override
		public boolean equals(Object obj) {
			if (this == obj)
				return true;
			if (!(obj instanceof MsgJsonObject))
				return false;
			return this.map.equals(((MsgJsonObject) obj).map);
		}

		@Override
		public int hashCode() {
			return this.map.hashCode();
		}

		@Override
		public JsonValue get(Object key) {
			return map.get(key);
		}

		@Override
		public boolean getBoolean(String name) {
			JsonValue value = get(name);
			Objects.requireNonNull(value);
			if (value == JsonValue.TRUE) {
				return true;
			} else if (value == JsonValue.FALSE) {
				return false;
			} else {
				throw new ClassCastException();
			}
		}

		@Override
		public boolean getBoolean(String name, boolean defaultValue) {
			JsonValue value = get(name);
			if (value == JsonValue.TRUE) {
				return true;
			} else if (value == JsonValue.FALSE) {
				return false;
			} else {
				return defaultValue;
			}
		}

		@Override
		public JsonNumber getJsonNumber(String name) {
			return (JsonNumber) get(name);
		}

		@Override
		public int getInt(String name) {
			return getJsonNumber(name).intValue();
		}

		@Override
		public int getInt(String name, int defaultValue) {
			JsonValue value = get(name);
			if (value instanceof JsonNumber v) {
				return v.intValue();
			} else {
				return defaultValue;
			}
		}

		@Override
		public JsonArray getJsonArray(String name) {
			return (JsonArray) get(name);
		}

		@Override
		public JsonObject getJsonObject(String name) {
			return (JsonObject) get(name);
		}

		@Override
		public JsonString getJsonString(String name) {
			return (JsonString) get(name);
		}

		@Override
		public String getString(String name) {
			return getJsonString(name).getString();
		}

		@Override
		public String getString(String name, String defaultValue) {
			JsonValue value = get(name);
			if (value instanceof JsonString v) {
				return v.getString();
			} else {
				return defaultValue;
			}
		}

		@Override
		public JsonValue getOrDefault(Object key, JsonValue defaultValue) {
			return map.getOrDefault(key, defaultValue);
		}

		@Override
		public boolean isEmpty() {
			return map.isEmpty();
		}

		@Override
		public boolean isNull(String name) {
			return get(name).equals(JsonValue.NULL);
		}

		@Override
		public Set<String> keySet() {
			return map.keySet();
		}

		@Override
		public JsonValue put(String key, JsonValue value) {
			return map.put(key, value);
		}

		@Override
		public void putAll(Map<? extends String, ? extends JsonValue> m) {
			map.putAll(m);
		}

		@Override
		public JsonValue remove(Object key) {
			return map.remove(key);
		}

		@Override
		public String toString() {
			return map.toString();
		}

		@Override
		public Collection<JsonValue> values() {
			return map.values();
		}
	}

	static class MsgJsonArray extends MsgJsonValue<org.msgpack.value.ArrayValue> implements JsonArray {
		private java.util.List<JsonValue> list;

		MsgJsonArray(org.msgpack.value.ArrayValue value) {
			super(value);
			this.list = value.asArrayValue().list().stream().map(Main::decodeJson).collect(Collectors.toUnmodifiableList());
		}

		@Override
		public ValueType getValueType() {
			return ValueType.ARRAY;
		}

		@Override
		public JsonValue get(int index) {
			return list.get(index);
		}

		@Override
		public int size() {
			return list.size();
		}

		@Override
		public JsonArray getJsonArray(int index) {
			return (JsonArray) get(index);
		}

		@Override
		public JsonObject getJsonObject(int index) {
			return (JsonObject) get(index);
		}

		@Override
		public JsonString getJsonString(int index) {
			return (JsonString) get(index);
		}

		@Override
		public String getString(int index) {
			return getJsonString(index).getString();
		}

		@Override
		public int getInt(int index) {
			return getJsonNumber(index).intValue();
		}

		@Override
		public boolean add(JsonValue e) {
			return list.add(e);
		}

		@Override
		public void add(int index, JsonValue element) {
			list.add(index, element);
		}

		@Override
		public boolean addAll(Collection<? extends JsonValue> c) {
			return list.addAll(c);
		}

		@Override
		public boolean addAll(int index, Collection<? extends JsonValue> c) {
			return list.addAll(index, c);
		}

		@Override
		public void clear() {
			list.clear();
		}

		@Override
		public boolean contains(Object o) {
			return list.contains(o);
		}

		@Override
		public boolean containsAll(Collection<?> c) {
			return list.containsAll(c);
		}

		@Override
		public boolean equals(Object obj) {
			if (this == obj)
				return true;
			if (!(obj instanceof MsgJsonArray))
				return false;
			return this.list.equals(((MsgJsonArray) obj).list);
		}

		@Override
		public boolean getBoolean(int index) {
			JsonValue jsonValue = get(index);
			if (jsonValue == JsonValue.TRUE) {
				return true;
			} else if (jsonValue == JsonValue.FALSE) {
				return false;
			} else {
				throw new ClassCastException();
			}
		}

		@Override
		public boolean getBoolean(int index, boolean defaultValue) {
			JsonValue jsonValue = get(index);
			if (jsonValue == JsonValue.TRUE) {
				return true;
			} else if (jsonValue == JsonValue.FALSE) {
				return false;
			} else {
				return defaultValue;
			}
		}

		@Override
		public int getInt(int index, int defaultValue) {
			JsonValue jsonValue = get(index);
			if (jsonValue instanceof JsonNumber v) {
				return v.intValue();
			} else {
				return defaultValue;
			}
		}

		@Override
		public JsonNumber getJsonNumber(int index) {
			return (JsonNumber) get(index);
		}

		@Override
		public String getString(int index, String defaultValue) {
			JsonValue jsonValue = get(index);
			if (jsonValue instanceof JsonString v) {
				return v.getString();
			} else {
				return defaultValue;
			}
		}

		@Override
		public <T extends JsonValue> List<T> getValuesAs(Class<T> clazz) {
			return (List<T>) list;
		}

		@Override
		public int hashCode() {
			return this.list.hashCode();
		}

		@Override
		public int indexOf(Object o) {
			return list.indexOf(o);
		}

		@Override
		public boolean isEmpty() {
			return list.isEmpty();
		}

		@Override
		public boolean isNull(int index) {
			return get(index) == JsonValue.NULL;
		}

		@Override
		public Iterator<JsonValue> iterator() {
			return list.iterator();
		}

		@Override
		public int lastIndexOf(Object o) {
			return list.lastIndexOf(o);
		}

		@Override
		public ListIterator<JsonValue> listIterator() {
			return list.listIterator();
		}

		@Override
		public ListIterator<JsonValue> listIterator(int index) {
			return list.listIterator(index);
		}

		@Override
		public JsonValue remove(int index) {
			return list.remove(index);
		}

		@Override
		public boolean remove(Object o) {
			return list.remove(o);
		}

		@Override
		public boolean removeAll(Collection<?> c) {
			return list.removeAll(c);
		}

		@Override
		public boolean retainAll(Collection<?> c) {
			return list.retainAll(c);
		}

		@Override
		public JsonValue set(int index, JsonValue element) {
			return list.set(index, element);
		}

		@Override
		public List<JsonValue> subList(int fromIndex, int toIndex) {
			return list.subList(fromIndex, toIndex);
		}

		@Override
		public Object[] toArray() {
			return list.toArray();
		}

		@Override
		public <T> T[] toArray(T[] a) {
			return list.toArray(a);
		}

		@Override
		public JsonArray asJsonArray() {
			return super.asJsonArray();
		}
	}

	public static void main(String[] args) throws IOException {
		System.out.println("Hello world!");
		var v = Json.createReader(Main.class.getResourceAsStream("sample.json")).readValue();
		try (MessageBufferPacker packer = org.msgpack.core.MessagePack.newDefaultBufferPacker()) {
			encodeJson(v, packer);
			packer.close();
			byte[] bytes = packer.toByteArray();

			var unpacker = org.msgpack.core.MessagePack.newDefaultUnpacker(bytes);
			while (unpacker.hasNext()) {
				var format = unpacker.getNextFormat();
				System.err.println(format);
			}

			/*
			 * decodeJson(org.msgpack.core.MessagePack.newDefaultUnpacker(bytes))
			 * .ifPresent(decoded ->
			 * Json.createWriterFactory(Map.of(JsonGenerator.PRETTY_PRINTING, "true"))
			 * .createWriter(System.out).write(decoded));
			 */
		}
	}

	private static Optional<JsonValue> decodeJson(MessageUnpacker unpacker) throws IOException {
		while (unpacker.hasNext()) {
			var value = unpacker.unpackValue();
			return Optional.of(decodeJson(value));
		}
		return Optional.empty();
	}

	private static JsonValue decodeJson(Value value) {
		switch (value.getValueType()) {
			case STRING:
				return new MsgJsonString(value.asStringValue());
			case INTEGER:
				return new MsgJsonNumber(value.asIntegerValue());
			case FLOAT:
				return new MsgJsonNumber(value.asFloatValue());
			case BOOLEAN:
				return value.asBooleanValue().getBoolean() ? JsonValue.TRUE : JsonValue.FALSE;
			case NIL:
				return JsonValue.NULL;
			case ARRAY: {
				// var arr = value.asArrayValue();
				/*
				 * var jsonArrBuilder = Json.createArrayBuilder();
				 * for (var v : arr) {
				 * jsonArrBuilder.add(decodeJson(v));
				 * }
				 * return jsonArrBuilder.build();
				 */
				return new MsgJsonArray(value.asArrayValue());
			}
			case MAP: {
				// var map = value.asMapValue();
				/*
				 * var jsonObjBuilder = Json.createObjectBuilder();
				 * for (var entry : map.entrySet()) {
				 * jsonObjBuilder.add(entry.getKey().asStringValue().asString(),
				 * decodeJson(entry.getValue()));
				 * }
				 * return jsonObjBuilder.build();
				 */
				return new Main().new MsgJsonObject(value.asMapValue());
			}
			default:
				System.out.println("Other: " + value);
		}
		return null;
	}

	private static void encodeJson(JsonValue jsonValue, MessageBufferPacker packer) throws IOException {
		if (jsonValue.getValueType() == JsonValue.ValueType.STRING) {
			packer.packString(((jakarta.json.JsonString) jsonValue).getString());
		} else if (jsonValue.getValueType() == JsonValue.ValueType.NUMBER) {
			var num = (jakarta.json.JsonNumber) jsonValue;
			if (num.isIntegral()) {
				var l = num.longValue();
				if (l >= Integer.MIN_VALUE && l <= Integer.MAX_VALUE) {
					packer.packInt((int) l);
				} else {
					packer.packLong(l);
				}
			} else {
				var d = num.doubleValue();
				packer.packDouble(d);
			}
		} else if (jsonValue.getValueType() == JsonValue.ValueType.OBJECT) {
			JsonObject obj = (JsonObject) jsonValue;
			packer.packMapHeader(obj.size());
			for (String key : obj.keySet()) {
				packer.packString(key);
				encodeJson(obj.get(key), packer);
			}
		} else if (jsonValue.getValueType() == JsonValue.ValueType.ARRAY) {
			jakarta.json.JsonArray arr = (jakarta.json.JsonArray) jsonValue;
			packer.packArrayHeader(arr.size());
			for (JsonValue val : arr) {
				encodeJson(val, packer);
			}
		} else if (jsonValue.getValueType() == JsonValue.ValueType.TRUE) {
			packer.packBoolean(true);
		} else if (jsonValue.getValueType() == JsonValue.ValueType.FALSE) {
			packer.packBoolean(false);
		} else if (jsonValue.getValueType() == JsonValue.ValueType.NULL) {
			packer.packNil();
		}
	}
}
