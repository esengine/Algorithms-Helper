module algorithms {
    export abstract class Comparer<T> implements IComparer<T> {
        public static get default() {
            return new DefaultComparer();
        }

        public abstract compare(x: T, y: T): number;
    }

    export class DefaultComparer<T extends IComparable<T>> extends Comparer<T> {
        public compare(x: T, y: T): number {
            return x.compareTo(y);
        }
    }
}