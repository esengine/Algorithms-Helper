module algorithms {
    export class QuickSorter {
        public static quickSort<T extends IComparable<T>>(collection: T[], comparer: Comparer<T> = null) {
            let startIndex = 0;
            let endIndex = collection.length - 1;

            comparer = comparer || Comparer.default;

            this.internalQuickSort(collection, startIndex, endIndex, comparer);
        }

        /** 递归快速排序算法 */
        private static internalQuickSort<T>(collection: T[], leftmostIndex: number, rightmostIndex: number, comparer: Comparer<T>) {
            if (leftmostIndex < rightmostIndex) {
                let wallIndex = this.internalPartition(collection, leftmostIndex, rightmostIndex, comparer);
                this.internalQuickSort(collection, leftmostIndex, wallIndex - 1, comparer);
                this.internalPartition(collection, wallIndex + 1, rightmostIndex, comparer);
            }
        }

        /** 分区函数，用于快速排序算法 */
        private static internalPartition<T>(collection: T[], leftmostIndex: number, rightmostIndex: number, comparer: Comparer<T>) {
            let wallIndex, piviotIndex;
            piviotIndex = rightmostIndex;
            let pivotValue = collection[piviotIndex];

            wallIndex = leftmostIndex;
            
            for (let i = leftmostIndex; i <= (rightmostIndex - 1); i ++) {
                if (comparer.compare(collection[i], pivotValue) <= 0) {
                    Helpers.swap(collection, i, wallIndex);
                    wallIndex ++;
                }
            }

            Helpers.swap(collection, wallIndex, piviotIndex);

            return wallIndex;
        }
    }
}