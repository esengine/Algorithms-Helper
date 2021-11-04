module algorithms {
    /**
     * Skip-List(跳表) 数据结构实现
     * 
     * 比一般的链表，有更高的查找效率，可比拟二叉查找树
     */
    export class SkipList<T extends IComparable<T>> {
        private _count: number;
        private _currentMaxLevel: number;

        private _firstNode: SkipListNode<T>;
        private _type: new () => T;

        private readonly maxLevel = 32;
        private readonly probability = 0.5;

        private _getNextLevel() {
            let lvl = 0;

            while (Math.random() < this.probability && lvl <= this._currentMaxLevel && lvl < this.maxLevel)
                ++ lvl;

            return lvl;
        }

        constructor(type: new () => T) {
            this._type = type;
            this._count = 0;
            this._currentMaxLevel = 1;
            this._firstNode = new SkipListNode<T>(new type(), this.maxLevel);

            for (let i = 0; i < this.maxLevel; ++ i)
                this._firstNode.forwards[i] = this._firstNode;
        }

        public get root() {
            return this._firstNode;
        }

        private get isEmpty() {
            return this._count == 0;
        }

        public get count() {
            return this._count;
        }
        
        public get level() {
            return this._currentMaxLevel;
        }

        /**
         * 将项目添加到列表
         * @param item 
         */
        public add(item: T) {
            let current = this._firstNode;
            let toBeUpdated = new Array<SkipListNode<T>>(this.maxLevel);

            for (let i = this._currentMaxLevel - 1; i >= 0; --i) {
                while (current.forwards[i] != this._firstNode && Comparers.isLessThan(current.forwards[i].value, item))
                    current = current.forwards[i];

                toBeUpdated[i] = current;
            }

            current = current.forwards[0];

            let lvl = this._getNextLevel();
            if (lvl > this._currentMaxLevel) {
                for (let i = this._currentMaxLevel; i < lvl; ++ i)
                    toBeUpdated[i] = this._firstNode;

                this._currentMaxLevel = lvl;
            }

            let newNode = new SkipListNode<T>(item, lvl);

            for (let i = 0; i < lvl; ++ i) {
                newNode.forwards[i] = toBeUpdated[i].forwards[i];
                toBeUpdated[i].forwards[i] = newNode;
            }

            ++ this._count;
        }

        /**
         * 从列表中删除一个元素然后返回它
         * @param item 
         * @returns 
         */
        private remove(item: T): {result: boolean, deleted: T} {
            let deleted: T;
            let current = this._firstNode;
            let toBeUpdated = new Array<SkipListNode<T>>(this.maxLevel);

            for (let i = this._currentMaxLevel - 1; i >= 0; --i) {
                while (current.forwards[i] != this._firstNode && Comparers.isLessThan(current.forwards[i].value, item))
                    current = current.forwards[i];

                toBeUpdated[i] = current;
            }

            current = current.forwards[0];

            if (Comparers.isEqualTo(current.value, item) == false) {
                deleted = new this._type();
                return {result: false, deleted: deleted};
            }

            for (let i = 0; i < this._currentMaxLevel; ++ i)
                if (toBeUpdated[i].forwards[i] == current)
                    toBeUpdated[i].forwards[i] = current.forwards[i];

            -- this._count;

            while (this._currentMaxLevel > 1 && this._firstNode.forwards[this._currentMaxLevel - 1] == this._firstNode)
                -- this._currentMaxLevel;


            deleted = current.value;
            return {result: true, deleted: deleted};
        }

        /**
         * 检查项目是否在列表中
         * @param item 
         * @returns 
         */
        public contains(item: T) {
            return this.find(item).contains;
        }

        /**
         * 查找一个元素并在找到时返回它
         * @param item 
         * @returns 
         */
        public find(item: T): {contains: boolean, itemOut: T} {
            let itemOut: T;
            let current = this._firstNode;

            for (let i = this._currentMaxLevel - 1; i >= 0; --i)
                while (current.forwards[i] != this._firstNode && Comparers.isLessThan(current.forwards[i].value, item))
                    current = current.forwards[i];

            current = current.forwards[0];

            if (Comparers.isEqualTo(current.value, item)) {
                itemOut = current.value;
                return {contains: true, itemOut: itemOut};
            }

            itemOut = new this._type();
            return {contains: false, itemOut: itemOut};
        }

        /**
         * 如果列表为空，则删除 min 元素； 否则抛出异常
         * @returns 
         */
        public deleteMin() {
            let min: T;

            let r = this.tryDeleteMin();
            min = r.result;
            if (!r.delete)
                throw new Error('skipList is empty');

            return min;
        }

        /**
         * 尝试删除最小元素，如果列表为空则返回 false
         * @returns 
         */
        public tryDeleteMin(): {delete: boolean, result: T} {
            let result: T;
            if (this.isEmpty) {
                result = new this._type();
                return {delete: false, result: result};
            }

            let r = this.remove(this._firstNode.forwards[0].value);
            return {delete: r.result, result: r.deleted};
        }

        /**
         * 如果列表不为空，则返回第一个元素； 否则抛出异常
         * @returns 
         */
        public peek() {
            let peek: T;

            let r = this.tryPeek();
            peek = r.result;
            if (!r.peek) {
                throw new Error('skipList is empty');
            }

            return peek;
        }

        /**
         * 尝试返回第一个元素，如果列表为空则返回 false
         * @returns 
         */
        public tryPeek(): {peek: boolean, result: T} {
            let result: T;
            
            if (this.isEmpty) {
                result = new this._type();
                return {peek: false, result: result};
            }

            result = this._firstNode.forwards[0].value;
            return {peek: true, result: result};
        }

        public* getEnumerator() {
            let node = this._firstNode;
            while (node.forwards[0] != null && node.forwards[0] != this._firstNode) {
                node = node.forwards[0];
                yield node.value;
            }
        }

        public clear() {
            this._count = 0;
            this._currentMaxLevel = 1;
            this._firstNode = new SkipListNode(new this._type(), this.maxLevel);

            for (let i = 0; i < this.maxLevel; ++ i)
                this._firstNode.forwards[i] = this._firstNode;
        }
    }
}