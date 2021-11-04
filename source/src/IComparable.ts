module algorithms {
    export interface IComparable<T> {
        compareTo(other: T): number;
    }
}