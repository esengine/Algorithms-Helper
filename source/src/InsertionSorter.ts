module algorithms {
    export class InsertionSorter {
        public static insertionSort<T extends IComparable<T>>(list: T[], comparer: Comparer<T> = null) {
            comparer = comparer || Comparer.default;

            let i, j;
            for (i = 1; i < list.length; i ++) {
                let value = list[i];
                j = i - 1;

                while ((j >= 0) && (comparer.compare(list[j], value) > 0)) {
                    list[j + 1] = list[j];
                    j --;
                }

                list[j + 1] = value;
            }
        }
    }
}