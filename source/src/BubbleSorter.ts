module algorithms {
    /** 冒泡排序 */
    export class BubbleSorter {
        public static bubbleSort<T extends IComparable<T>>(collection: T[], comparer: Comparer<T> = null) {
            comparer = comparer || Comparer.default;
            this.bubbleSortAscending(collection, comparer);
        }

        public static bubbleSortAscending<T>(collection: T[], comparer: Comparer<T>) {
            for (let i = 0; i < collection.length; i ++) {
                for (let index = 0; index < collection.length - i - 1; index ++) {
                    if (comparer.compare(collection[index], collection[index + 1]) > 0) {
                        Helpers.swap(collection, index, index + 1);
                    }
                }
            }
        }

        public static bubbleSortDescending<T>(collection: T[], comparer: Comparer<T>) {
            for (let i = 0; i < collection.length; i ++) {
                for (let index = 1; index < collection.length - i; index ++) {
                    if (comparer.compare(collection[index], collection[index - 1]) > 0) {
                        Helpers.swap(collection, index - 1, index);
                    }
                }
            }
        }
    }
}