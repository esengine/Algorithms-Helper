declare module algorithms {
    class Comparers {
        static isEqualTo<T extends IComparable<T>>(firstValue: T, secondValue: T): boolean;
        static isLessThan<T extends IComparable<T>>(firstValue: T, secondValue: T): boolean;
    }
}
declare module algorithms {
    interface IComparable<T> {
        compareTo(other: T): number;
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
