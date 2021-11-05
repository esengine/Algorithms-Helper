module algorithms {
    export class HeapSorter {
        /**
         * 按升序排序。 使用最大堆
         * @param collection 
         * @param comparer 
         */
        public static heapSort<T extends IComparable<T>>(collection: T[], comparer: Comparer<T> = null) {
            this.heapSortAscending(collection, comparer);
        }

        /**
         * 升序排列
         * 使用最大堆
         * @param collection 
         * @param comparer 
         */
        public static heapSortAscending<T extends IComparable<T>>(collection: T[], comparer: Comparer<T> = null) {
            comparer = comparer || Comparer.default;

            let lastIndex = collection.length - 1;
            this.buildMaxHeap(collection, 0, lastIndex, comparer);

            while (lastIndex >= 0) {
                Helpers.swap(collection, 0, lastIndex);
                lastIndex --;
                this.maxHeapify(collection, 0, lastIndex, comparer);
            }
        }

        /**
         * 从 collection 集合构建最大堆
         * @param collection 
         * @param firstIndex 
         * @param lastIndex 
         * @param comparer 
         */
        public static buildMaxHeap<T>(collection: T[], firstIndex: number, lastIndex: number, comparer: Comparer<T>) {
            let lastNodeWithChildren = lastIndex / 2;

            for (let node = lastNodeWithChildren; node >= 0; --node) {
                this.maxHeapify(collection, node, lastIndex, comparer);
            }
        }

        /**
         * 两个索引（包括）之间的元素，在顶部保持最大值。
         * @param collection 
         * @param nodeIndex 
         * @param lastIndex 
         * @param comparer 
         */
        public static maxHeapify<T>(collection: T[], nodeIndex: number, lastIndex: number, comparer: Comparer<T>) {
            let left = (nodeIndex * 2) + 1;
            let right = left + 1;
            let largest = nodeIndex;

            if (left <= lastIndex && comparer.compare(collection[left], collection[nodeIndex]) > 0)
                largest = left;

            if (right <= lastIndex && comparer.compare(collection[right], collection[largest]) > 0)
                largest = right;

            if (largest != nodeIndex) {
                Helpers.swap(collection, nodeIndex, largest);
                this.maxHeapify(collection, largest, lastIndex, comparer);
            }
        }
    }
}