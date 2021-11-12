declare module algorithms {
    enum TRaversalMode {
        inOrder = 0,
        preOrder = 1,
        postOrder = 2
    }
    /**
     * 实现通用的二叉搜索树数据结构
     */
    class BinarySearchTree<T extends IComparable<T>> {
        protected _count: number;
        protected _allowDuplicates: boolean;
        protected _root: BSTNode<T>;
        root: BSTNode<T>;
        /**
         * 如果allowDuplictes 设置为false，则不会插入重复项
         * @param allowDuplicates
         */
        constructor(allowDuplicates?: boolean);
        /**
         * 将节点的值从其父节点对象替换为 newValue
         * @param node
         * @param newNode
         */
        protected _replaceNodeInParent(node: BSTNode<T>, newNode?: BSTNode<T>): void;
        /**
         * 删除指定的节点
         * @param node
         * @returns
         */
        protected _remove(node: BSTNode<T>): any;
        /**
         * 向树中插入一个新节点
         * @param newNode
         * @returns
         */
        protected _insertNode(newNode: BSTNode<T>): any;
        /**
         * 递归计算特定节点的树高
         * @param node
         * @returns
         */
        protected _getTreeHeight(node: BSTNode<T>): any;
        /**
         * 在给定值的情况下，在另一个节点的子树中查找一个节点
         * @param currentNode
         * @param item
         * @returns
         */
        protected _findNode(currentNode: BSTNode<T>, item: T): BSTNode<T>;
        /**
         * 返回子树中的最小节点
         * @param node
         * @returns
         */
        protected _findMinNode(node: BSTNode<T>): BSTNode<T>;
        /**
         * 返回子树中的最大节点
         * @param node
         * @returns
         */
        protected _findMaxNode(node: BSTNode<T>): BSTNode<T>;
        /**
         * 与指定节点相比，查找 value 中的下一个较小节点。
         * @param node
         * @returns
         */
        protected _findNextSmaller(node: BSTNode<T>): BSTNode<T>;
        /**
         * 查找与指定节点相比值中下一个更大的节点
         * @param node
         * @returns
         */
        protected _findNextLarger(node: BSTNode<T>): BSTNode<T>;
        /**
         * 实现有序遍历以查找子树中的所有匹配元素
         * @param currentNode
         * @param match
         * @param list
         * @returns
         */
        protected _findAll(currentNode: BSTNode<T>, match: (v: T) => boolean, list: T[]): void;
        /**
         * 节点子树的有序遍历。 返回它访问的每个节点。
         * @param currentNode
         * @param list
         * @returns
         */
        protected _inOrderTraverse(currentNode: BSTNode<T>, list: T[]): void;
        /**
         * 返回这棵树中元素的数量
         */
        readonly count: number;
        /**
         * 检查树是否为空
         */
        readonly isEmpty: boolean;
        /**
         * 返回树的高度
         */
        readonly height: any;
        readonly allowsDuplicates: boolean;
        /**
         * 向树中插入一个元素
         * @param item
         */
        insert(item: T): void;
        /**
         * 从树中删除一个元素
         * @param item
         */
        remove(item: T): void;
        /**
         * 从树中删除最小值
         */
        removeMin(): void;
        /**
         * 从树中删除最大值
         */
        removeMax(): void;
        /**
         * 清除树中的所有元素
         */
        clear(): void;
        /**
         * 检查项目是否存在
         * @param item
         * @returns
         */
        contains(item: T): boolean;
        /**
         * 查找树中的最小值
         * @returns
         */
        findMin(): T;
        /**
         * 与指定项相比，在树中查找下一个较小的元素
         * @param item
         * @returns
         */
        findNextSmaller(item: T): T;
        /**
         * 与指定项相比，在树中查找下一个较大的元素
         * @param item
         * @returns
         */
        findNextLarger(item: T): T;
        /**
         * 查找树中的最大值
         * @returns
         */
        findMax(): T;
        /**
         * 在树中找到项目。 如果未找到则抛出异常
         * @param item
         * @returns
         */
        find(item: T): T;
        /**
         * 给定一个查找函数，找出所有匹配它的元素
         * @param searchPredicate
         * @returns
         */
        findAll(searchPredicate: (t: T) => boolean): any[];
    }
}
declare module algorithms {
    class AVLTree<T extends IComparable<T>> extends BinarySearchTree<T> {
        protected _root: AVLTreeNode<T>;
        constructor(allowDuplicates: boolean);
        /**
         * 返回节点的高度
         * @param node
         * @returns
         */
        private _getNodeHeight;
        /**
         * 更新节点的高度
         * @param node
         * @returns
         */
        private _updateNodeHeight;
        /**
         * 递归更新节点及其父节点的高度，直到树的根
         * @param node
         * @returns
         */
        private _updateHeightRecursive;
        /**
         * 返回节点的 AVL 平衡因子
         * @param node
         * @returns
         */
        private _getBalanceFactor;
        /**
         * 在 AVL 树中向左旋转节点
         * @param currentNode
         * @returns
         */
        private _rotateLeftAt;
        /**
         * 在 AVL 树中向右旋转节点
         * @param currentNode
         * @returns
         */
        private _rotateRightAt;
        /**
         * 重新平衡节点周围的树
         * @param currentNode
         * @returns
         */
        private _rebalanceSubtreeTreeAt;
        /**
         * 围绕节点重新平衡整个树
         * @param node
         */
        private _rebalanceTreeAt;
        /**
         * 将元素列表插入到树中
         * @param item
         */
        insert(item: T): void;
        /**
         * 从树中删除一个项目
         * @param item
         */
        remove(item: T): void;
        /**
         * 从树中删除最小值
         */
        removeMin(): void;
        /**
         * 从树中删除最大值
         */
        removeMax(): void;
    }
}
declare module algorithms {
    class BSTNode<T extends IComparable<T>> {
        private _value;
        private _parent;
        private _left;
        private _right;
        constructor(value: T, parent?: BSTNode<T>, left?: BSTNode<T>, right?: BSTNode<T>);
        value: T;
        parent: BSTNode<T>;
        leftChild: BSTNode<T>;
        rightChild: BSTNode<T>;
        /**
         * 检查此节点是否有任何子节点
         */
        readonly hasChildren: boolean;
        /**
         * 检查此节点是否有左子节点
         */
        readonly hasLeftChild: boolean;
        /**
         * 检查此节点是否只有一个子节点以及它是否是右子节点
         */
        readonly hasOnlyRightChild: boolean;
        /**
         * 检查此节点是否有右子节点
         */
        readonly hasRightChild: boolean;
        /**
         * 检查此节点是否只有一个子节点以及它是否为左子节点
         */
        readonly hasOnlyLeftChild: boolean;
        /**
         * 检查此节点是否是其父节点的左子节点
         */
        readonly isLeftChild: boolean;
        /**
         * 检查此节点是否是其父节点的左子节点
         */
        readonly isRightChild: boolean;
        /**
         * 检查此节点是否为叶节点
         */
        readonly isLeafNode: boolean;
        /**
         * 返回直接子节点的数量：0、1、2（无、左或右，或两者）
         */
        readonly childrenCount: number;
        compareTo(other: BSTNode<T>): number;
    }
}
declare module algorithms {
    class AVLTreeNode<T extends IComparable<T>> extends BSTNode<T> {
        private _height;
        constructor(value: T, height?: number, parent?: AVLTreeNode<T>, left?: AVLTreeNode<T>, right?: AVLTreeNode<T>);
        height: number;
    }
}
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
    /** 冒泡排序 */
    class BubbleSorter {
        static bubbleSort<T extends IComparable<T>>(collection: T[], comparer?: Comparer<T>): void;
        static bubbleSortAscending<T>(collection: T[], comparer: Comparer<T>): void;
        static bubbleSortDescending<T>(collection: T[], comparer: Comparer<T>): void;
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
        static isGreaterThan<T extends IComparable<T>>(firstValue: T, secondValue: T): boolean;
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
        static populate<T>(list: T[][], rows: number, columns: number, defaultValue: T): void;
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
    class InsertionSorter {
        static insertionSort<T extends IComparable<T>>(list: T[], comparer?: Comparer<T>): void;
    }
}
declare module algorithms {
    /** 奇偶排序 */
    class OddEvenSorter {
        static oddEvenSort<T extends IComparable<T>>(collection: T[], comparer?: Comparer<T>): void;
        static oddEvenSortAscending<T>(collection: T[], comparer: Comparer<T>): void;
        static oddEvenSortDescending<T>(collection: T[], comparer: Comparer<T>): void;
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
