import { toNodeTree } from '../util.js';

export function generateBaseContent(fqn: (type: string) => string) {
	fqn('java.util.function.Function');
	fqn('java.util.function.Consumer');
	fqn('java.util.List');

	return toNodeTree(`
		public interface _Base {
			public interface Nillable<T> {
				public <R> R apply(Function<T, R> function, R defaultValue);

				public void accept(Consumer<T> block);

				public <R> Nillable<R> map(Function<T, R> mapper);

				public boolean isUndefined();

				public boolean isNull();
			}
			
			public interface BaseData {
			}

			public interface BaseDataBuilder<T> {
				public T build();
			}

			public interface ListReplace<T> {
				public List<T> elements();
			}

			public interface ListMergeAddRemove<A, R> {
				public List<A> additions();

				public List<R> removals();
			}

			public interface ListMergeAddRemoveUpdate<A, U, R> extends ListMergeAddRemove<A, R> {
				public List<U> updates();
			}
		}`);
}
