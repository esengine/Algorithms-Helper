module algorithms {
    /** 奇偶排序 */
    export class OddEvenSorter {
        public static oddEvenSort<T extends IComparable<T>>(collection: T[], comparer: Comparer<T> = null) {
            comparer = comparer || Comparer.default;
            this.oddEvenSortAscending(collection, comparer);
        }

        public static oddEvenSortAscending<T>(collection: T[], comparer: Comparer<T>) {
            let sorted = false;
            while (!sorted) {
                sorted = true;
                for (let i = 1; i < collection.length - 1; i += 2) {
                    if (comparer.compare(collection[i], collection[i + 1]) > 0) {
                        Helpers.swap(collection, i, i + 1);
                        sorted = false;
                    }
                }

                for (let i = 0; i < collection.length - 1; i += 2) {
                    if (comparer.compare(collection[i], collection[i + 1]) > 0) {
                        Helpers.swap(collection, i, i + 1);
                        sorted = false;
                    }
                }
            }
        }

        public static oddEvenSortDescending<T>(collection: T[], comparer: Comparer<T>) {
            let sorted = false;
            while (!sorted) {
                sorted = true;
                for (let i = 1; i < collection.length - 1; i += 2) {
                    if (comparer.compare(collection[i], collection[i + 1]) < 0) {
                        Helpers.swap(collection, i, i + 1);
                        sorted = false;
                    }
                }

                for (let i = 0; i < collection.length - 1; i += 2) {
                    if (comparer.compare(collection[i], collection[i + 1]) < 0) {
                        Helpers.swap(collection, i, i + 1);
                        sorted = false;
                    }
                }
            }
        }
    }
}