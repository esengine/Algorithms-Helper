module algorithms {
    export interface IComparer<T> {
        compare(x: T, y: T): number;
    }
}