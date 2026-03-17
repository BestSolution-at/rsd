import { CompositeGeneratorNode } from 'langium/generate';
import { toNodeTree } from '../util.js';

export function generateNillableContent(
	fqn: (type: string) => string,
	modelApiPackage: string,
): CompositeGeneratorNode {
	fqn('java.util.function.Consumer');
	fqn('java.util.function.Function');
	fqn('java.util.function.Supplier');
	fqn('java.util.Optional');
	fqn(`${modelApiPackage}._Base`);

	return toNodeTree(`
		public class _NillableImpl<T> implements _Base.Nillable<T> {
			private static _NillableImpl<?> UNDEFINED = new _NillableImpl<>(null);
			private static _NillableImpl<?> NULL = new _NillableImpl<>(null);
			private final T value;

			_NillableImpl(T value) {
				this.value = value;
			}

			@Override
			public <X> X apply(Function<T, X> function, X defaultValue) {
				if (this == UNDEFINED) {
					return defaultValue;
				}
				return function.apply(value);
			}

			@Override
			public void accept(Consumer<T> block) {
				if (this != UNDEFINED) {
					block.accept(value);
				}
			}

			@SuppressWarnings("unchecked")
			@Override
			public <X> _Base.Nillable<X> map(Function<T, X> mapper) {
				if (this == UNDEFINED) {
					return (_Base.Nillable<X>) UNDEFINED;
				} else if (this == NULL) {
					return (_Base.Nillable<X>) NULL;
				}
				return of(mapper.apply(value));
			}

			@Override
			public boolean isUndefined() {
				return this == UNDEFINED;
			}

			@Override 
			public boolean isNull() {
				return this == NULL;
			}
			
			@SuppressWarnings("unchecked")
			public static <T> _Base.Nillable<T> undefined() {
				return (_NillableImpl<T>) UNDEFINED;
			}

			@SuppressWarnings("unchecked")
			public static <T> _Base.Nillable<T> nill() {
				return (_NillableImpl<T>) NULL;
			}

			public static <T> _Base.Nillable<T> of(T value) {
				if (value != null) {
					return new _NillableImpl<>(value);
				}
				return nill();
			}

			public T orElse(T defaultValue) {
				if (this == UNDEFINED || this == NULL) {
					return defaultValue;
				}
				return value;
			}
			
			public T orElseGet(Supplier<T> defaultValueSupplier) {
				if (this == UNDEFINED || this == NULL) {
					return defaultValueSupplier.get();
				}
				return value;
			}

			public Optional<T> toOptional() {
				if (this == UNDEFINED || this == NULL) {
					return Optional.empty();
				}
				return Optional.of(value);
			}
		}`);
}
