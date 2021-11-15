module algorithms {
    /**
     * 最大堆数据结构
     */
    export class BinaryMaxHeap<T extends IComparable<T>> {
        /**
         * 元素列表
         */
        private _collection: T[];
        private _heapComparer: Comparer<T> = Comparer.default;

        constructor(capacity: number = 0, comparer: Comparer<T> = null) {
            this._collection = [];
            this._heapComparer = comparer || Comparer.default;
        }

        /**
         * 从内部数组列表 _collection 构建最大堆
         */
        private _buildMaxHeap() {
            let lastIndex = this._collection.length - 1;
            let lastNodeWithChildren = lastIndex / 2;

            for (let node = lastNodeWithChildren; node >= 0; node --) {
                this._maxHeapify(node, lastIndex);
            }
        }

        /**
         * 用于在插入后恢复堆状态
         * @param nodeIndex 
         */
        private _siftUp(nodeIndex: number) {
            let parent = (nodeIndex - 1) / 2;
            while (this._heapComparer.compare(this._collection[nodeIndex], this._collection[parent]) > 0) {
                Helpers.swap(this._collection, parent, nodeIndex);
                nodeIndex = parent;
                parent = (nodeIndex - 1) / 2;
            }
        }

        /**
         * 用于构建最大堆
         * @param nodeIndex 
         * @param lastIndex 
         */
        private _maxHeapify(nodeIndex: number, lastIndex: number) {
            // 假设子树 left(node) 和 right(node) 是最大堆
            let left = (nodeIndex * 2) + 1;
            let right = left + 1;
            let largest = nodeIndex;

            if (left <= lastIndex && this._heapComparer.compare(this._collection[left], this._collection[nodeIndex]) > 0)
                largest = left;

            if (right <= lastIndex && this._heapComparer.compare(this._collection[right], this._collection[largest]) > 0)
                largest = right;

            if (largest != nodeIndex) {
                Helpers.swap(this._collection, nodeIndex, largest);
                this._maxHeapify(largest, lastIndex);
            }
        }

        /**
         * 返回堆中元素的数量
         */
        public get count() {
            return this._collection.length;
        }

        /**
         * 检查此堆是否为空
         */
        public get isEmpty() {
            return this._collection.length == 0;
        }

        public get(index: number) {
            if (index < 0 || index > this.count || this.count == 0) {
                throw new Error("index out of range");
            }

            return this._collection[index];
        }

        public set(index: number, value: T) {
            if (index < 0 || index >= this.count) {
                throw new Error("index out of range");
            }
            
            this._collection[index] = value;

            if (index != 0 && this._heapComparer.compare(this._collection[index], this._collection[(index - 1) / 2]) > 0)
                this._siftUp(index);
            else
                this._maxHeapify(index, this._collection.length - 1);
        }

        /**
         * 堆化指定的 newCollection。 覆盖当前堆
         * @param newCollection 
         */
        public initialize(newCollection: T[]) {
            if (newCollection.length > 0) {
                this._collection = [];

                for (let i = 0; i < newCollection.length; ++ i) {
                    this._collection.push(newCollection[i]);
                }

                this._buildMaxHeap();
            }
        }

        /**
         * 向堆中添加一个新键
         * @param heapKey 
         */
        public add(heapKey: T) {
            this._collection.push(heapKey);
            if (!this.isEmpty) {
                this._siftUp(this._collection.length - 1);
            }
        }

        /**
         * 找到最大堆的最大节点
         * @returns 
         */
        public peek(): T {
            if (this.isEmpty) {
                throw new Error("heap is empty");
            }

            return this._collection[0];
        }

        /**
         * 从最小堆中删除最小值的节点
         */
        public removeMax() {
            if (this.isEmpty) {
                throw new Error("heap is empty");
            }

            
            let max = 0;
            let last = this._collection.length - 1;
            Helpers.swap(this._collection, max, last);

            this._collection.splice(last, 1);
            last --;

            this._maxHeapify(0, last);
        }
        
        /**
         * 从堆中删除后，从最大堆中返回最大值的节点
         * @returns 
         */
        public extractMax() {
            let max = this.peek();
            this.removeMax();
            return max;
        }

        /**
         * 清除堆
         */
        public clear() {
            if (this.isEmpty) {
                throw new Error("heap is empty");
            }

            this._collection.length = 0;
        }

        /**
         * 重建堆
         */
        public rebuildHeap() {
            this._buildMaxHeap();
        }

        /**
         * 将两个堆联合在一起，返回两个堆元素的新最小堆
         * @param firstMaxHeap 
         * @param secondMaxHeap 
         */
        public union(firstMaxHeap: BinaryMaxHeap<T>, secondMaxHeap: BinaryMaxHeap<T>) {
            if (firstMaxHeap == null || secondMaxHeap == null)
                throw new Error("null heaps are not allowed");

            let size = firstMaxHeap.count + secondMaxHeap.count;
            let newHeap = new BinaryMaxHeap(size, Comparer.default);

            while (firstMaxHeap.isEmpty == false)
                newHeap.add(firstMaxHeap.extractMax());

            while (secondMaxHeap.isEmpty == false)
                newHeap.add(secondMaxHeap.extractMax());

            firstMaxHeap = secondMaxHeap = null;
            return newHeap;
        }

        /**
         * 返回一个新的最小堆，其中包含此堆的所有元素
         * @returns 
         */
        public toMinHeap() {
            let newMinHeap = new BinaryMaxHeap(this.count, this._heapComparer);
            newMinHeap.initialize(this._collection);
            return newMinHeap;
        }
    }
}