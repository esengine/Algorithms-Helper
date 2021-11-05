declare module algorithms {
    class BinarySearcher<T extends IComparable<T>> {
        private readonly _collection;
        private readonly _comparer;
        private _item;
        private _currentItemIndex;
        private _leftIndex;
        private _rightIndex;
        readonly current: T;
        constructor(collection: T[], comparer: Comparer<T>);
        /**
         * 在列表中应用二分搜索
         * @param item
         * @returns
         */
        binarySearch(item: T): number;
        moveNext(): boolean;
        reset(): void;
    }
}
declare module algorithms {
    class BinomialCoefficients {
        private static readonly Cache;
        /**
         * 计算二项式系数 C(n, k)
         * @param n
         * @returns
         */
        static calculate(n: number): number;
        private static factorial;
    }
}
declare module algorithms {
    /**
     * 计算 卡塔兰数。 动态规划解决方案
     *
     * https://zh.wikipedia.org/wiki/Catalan_number
     */
    class CatalanNumbers {
        /** 默认情况下，前两个卡塔兰数：0 和 1。 */
        private static readonly CachedCatalanNumbers;
        private static recursiveHelper;
        static getNumber(rank: number): number;
        /**
         * 使用二项式系数算法计算数字
         * @param rank
         * @returns
         */
        static getNumberByBinomialCoefficients(rank: number): number;
        static getRange(fromRank: number, toRank: number): any[];
    }
}
declare module algorithms {
    abstract class Comparer<T> implements IComparer<T> {
        static readonly default: DefaultComparer<IComparable<{}>>;
        abstract compare(x: T, y: T): number;
    }
    class DefaultComparer<T extends IComparable<T>> extends Comparer<T> {
        compare(x: T, y: T): number;
    }
}
declare module algorithms {
    class Comparers {
        static isEqualTo<T extends IComparable<T>>(firstValue: T, secondValue: T): boolean;
        static isLessThan<T extends IComparable<T>>(firstValue: T, secondValue: T): boolean;
    }
}
declare module algorithms {
    /**
     * 地精排序
     */
    class GnomeSorter {
        static gnomeSort<T extends IComparable<T>>(collection: T[], comparer?: Comparer<T>): void;
        static gnomeSortAscending<T>(collection: T[], comparer: Comparer<T>): void;
        static gnomeSortDescending<T>(collection: T[], comparer: Comparer<T>): void;
    }
}
declare module algorithms {
    class HeapSorter {
        /**
         * 按升序排序。 使用最大堆
         * @param collection
         * @param comparer
         */
        static heapSort<T extends IComparable<T>>(collection: T[], comparer?: Comparer<T>): void;
        /**
         * 升序排列
         * 使用最大堆
         * @param collection
         * @param comparer
         */
        static heapSortAscending<T extends IComparable<T>>(collection: T[], comparer?: Comparer<T>): void;
        /**
         * 从 collection 集合构建最大堆
         * @param collection
         * @param firstIndex
         * @param lastIndex
         * @param comparer
         */
        static buildMaxHeap<T>(collection: T[], firstIndex: number, lastIndex: number, comparer: Comparer<T>): void;
        /**
         * 两个索引（包括）之间的元素，在顶部保持最大值。
         * @param collection
         * @param nodeIndex
         * @param lastIndex
         * @param comparer
         */
        static maxHeapify<T>(collection: T[], nodeIndex: number, lastIndex: number, comparer: Comparer<T>): void;
    }
}
declare module algorithms {
    class Helpers {
        static swap<T>(list: T[], firstIndex: number, secondIndex: number): void;
    }
}
declare module algorithms {
    interface IComparable<T> {
        compareTo(other: T): number;
    }
}
declare module algorithms {
    interface IComparer<T> {
        compare(x: T, y: T): number;
    }
}
declare module algorithms {
    class QuickSorter {
        static quickSort<T extends IComparable<T>>(collection: T[], comparer?: Comparer<T>): void;
        /** 递归快速排序算法 */
        private static internalQuickSort;
        /** 分区函数，用于快速排序算法 */
        private static internalPartition;
    }
}
declare module algorithms {
    /**
     * Skip-List(跳表) 数据结构实现
     *
     * 比一般的链表，有更高的查找效率，可比拟二叉查找树
     */
    class SkipList<T extends IComparable<T>> {
        private _count;
        private _currentMaxLevel;
        private _firstNode;
        private _type;
        private readonly maxLevel;
        private readonly probability;
        private _getNextLevel;
        constructor(type: new () => T);
        readonly root: SkipListNode<T>;
        private readonly isEmpty;
        readonly count: number;
        readonly level: number;
        /**
         * 将项目添加到列表
         * @param item
         */
        add(item: T): void;
        /**
         * 从列表中删除一个元素然后返回它
         * @param item
         * @returns
         */
        private remove;
        /**
         * 检查项目是否在列表中
         * @param item
         * @returns
         */
        contains(item: T): boolean;
        /**
         * 查找一个元素并在找到时返回它
         * @param item
         * @returns
         */
        find(item: T): {
            contains: boolean;
            itemOut: T;
        };
        /**
         * 如果列表为空，则删除 min 元素； 否则抛出异常
         * @returns
         */
        deleteMin(): T;
        /**
         * 尝试删除最小元素，如果列表为空则返回 false
         * @returns
         */
        tryDeleteMin(): {
            delete: boolean;
            result: T;
        };
        /**
         * 如果列表不为空，则返回第一个元素； 否则抛出异常
         * @returns
         */
        peek(): T;
        /**
         * 尝试返回第一个元素，如果列表为空则返回 false
         * @returns
         */
        tryPeek(): {
            peek: boolean;
            result: T;
        };
        getEnumerator(): IterableIterator<T>;
        copyTo(array: T[], arrayIndex: number): void;
        clear(): void;
    }
}
declare module algorithms {
    class SkipListNode<T extends IComparable<T>> {
        private _value;
        private _forwards;
        constructor(value: T, level: number);
        value: T;
        forwards: SkipListNode<T>[];
        readonly level: number;
        compareTo(other: SkipListNode<T>): number;
    }
}
