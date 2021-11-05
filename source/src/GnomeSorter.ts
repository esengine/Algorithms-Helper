module algorithms {
    /**
     * 地精排序
     */
    export class GnomeSorter {
        public static gnomeSort<T extends IComparable<T>>(collection: T[], comparer: Comparer<T> = null) {
            comparer = comparer || Comparer.default;
            this.gnomeSortAscending(collection, comparer);
        }

        public static gnomeSortAscending<T>(collection: T[], comparer: Comparer<T>) {
            let pos = 1;
            while (pos < collection.length) {
                if (comparer.compare(collection[pos], collection[pos - 1]) >= 0) {
                    pos ++;
                } else {
                    Helpers.swap(collection, pos, pos - 1);
                    if (pos > 1) {
                        pos --;
                    }
                }
            }
        }

        public static gnomeSortDescending<T>(collection: T[], comparer: Comparer<T>) {
            let pos = 1;
            while (pos < collection.length) {
                if (comparer.compare(collection[pos], collection[pos - 1]) <= 0) {
                    pos ++;
                } else {
                    Helpers.swap(collection, pos, pos - 1);
                    if (pos > 1) {
                        pos --;
                    }
                }
            }
        }
    }
}