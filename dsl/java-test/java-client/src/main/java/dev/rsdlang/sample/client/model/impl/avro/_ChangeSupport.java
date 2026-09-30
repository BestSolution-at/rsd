package dev.rsdlang.sample.client.model.impl.avro;

import java.util.List;
import java.util.function.Function;

import org.apache.avro.generic.GenericRecord;

import dev.rsdlang.sample.client.model._Base;

public class _ChangeSupport {
	public static <T> T of(
			GenericRecord o,
			String recordType,
			String patchSchema,
			Function<GenericRecord, T> setFactory,
			Function<GenericRecord, T> deltaFactory) {
		var schema = o.getSchema().getName();
		if (schema.equals(recordType)) {
			return setFactory.apply(o);
		} else if (schema.equals(patchSchema)) {
			return deltaFactory.apply(o);
		} else {
			throw new IllegalArgumentException("Unhandled schema: " + schema);
		}
	}

	public abstract static class ListMergeAddRemoveImpl<A, R> extends _BaseDataImpl
			implements _Base.ListMergeAddRemove<A, R> {
		private final Function<Object, A> additionConverter;
		private final Function<Object, R> removalConverter;

		ListMergeAddRemoveImpl(
				GenericRecord data,
				Function<Object, A> additionConverter,
				Function<Object, R> removalConverter) {
			super(data);
			this.additionConverter = additionConverter;
			this.removalConverter = removalConverter;
		}

		@Override
		public List<A> additions() {
			return _AvroUtils.mapToStream(
					data,
					"additions",
					Object.class,
					additionConverter).toList();
		}

		@Override
		public List<R> removals() {
			return _AvroUtils.mapToStream(
					data,
					"removals",
					Object.class,
					removalConverter).toList();
		}
	}

	public abstract static class ListMergeAddRemoveUpdateImpl<A, U, R> extends _BaseDataImpl
			implements _Base.ListMergeAddRemoveUpdate<A, U, R> {

		private final Function<GenericRecord, A> additionConverter;
		private final Function<GenericRecord, U> updateConverter;
		private final Function<Object, R> removalConverter;

		public ListMergeAddRemoveUpdateImpl(
				GenericRecord data,
				Function<GenericRecord, A> additionConverter,
				Function<GenericRecord, U> updateConverter,
				Function<Object, R> removalConverter) {
			super(data);
			this.additionConverter = additionConverter;
			this.updateConverter = updateConverter;
			this.removalConverter = removalConverter;
		}

		@Override
		public List<A> additions() {
			return _AvroUtils.mapObjects(data, "additions", this.additionConverter);
		}

		@Override
		public List<R> removals() {
			return _AvroUtils.mapToStream(data, "removals", Object.class, this.removalConverter).toList();
		}

		@Override
		public List<U> updates() {
			return _AvroUtils.mapObjects(data, "updates", this.updateConverter);
		}
	}

	public abstract static class ValueElementsChange<T> extends _BaseDataImpl implements _Base.ListReplace<T> {
		private final Function<Object, T> converter;

		ValueElementsChange(GenericRecord data, Function<Object, T> converter) {
			super(data);
			this.converter = converter;
		}

		@Override
		public List<T> elements() {
			return _AvroUtils.mapToStream(data, "elements", Object.class, converter).toList();
		}
	}

	public abstract static class ObjectElementsChange<T> extends _BaseDataImpl implements _Base.ListReplace<T> {
		private final Function<GenericRecord, T> converter;

		ObjectElementsChange(GenericRecord data, Function<GenericRecord, T> converter) {
			super(data);
			this.converter = converter;
		}

		@Override
		public List<T> elements() {
			return _AvroUtils.mapObjects(data, "elements", converter);
		}
	}
}
