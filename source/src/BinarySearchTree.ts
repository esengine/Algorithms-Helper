module algorithms {
    export enum TRaversalMode {
        inOrder = 0,
        preOrder = 1,
        postOrder = 2
    }

    /**
     * 实现通用的二叉搜索树数据结构
     */
    export class BinarySearchTree<T extends IComparable<T>> {
        protected _count: number;
        protected _allowDuplicates: boolean;
        protected _root: BSTNode<T>;

        public get root() {
            return this._root;
        }

        public set root(value: BSTNode<T>) {
            this._root = value;
        }

        /**
         * 如果allowDuplictes 设置为false，则不会插入重复项
         * @param allowDuplicates 
         */
        constructor(allowDuplicates: boolean = true) {
            this._count = 0;
            this._allowDuplicates = allowDuplicates;
            this.root = null;
        }

        /**
         * 将节点的值从其父节点对象替换为 newValue
         * @param node 
         * @param newNode 
         */
        protected _replaceNodeInParent(node: BSTNode<T>, newNode: BSTNode<T> = null) {
            if (node.parent != null) {
                if (node.isLeftChild)
                    node.parent.leftChild = newNode;
                else
                    node.parent.rightChild = newNode;
            } else {
                this.root = newNode;
            }

            if (newNode != null)
                newNode.parent = node.parent;
        }

        /**
         * 删除指定的节点
         * @param node 
         * @returns 
         */
        protected _remove(node: BSTNode<T>) {
            if (node == null)
                return false;

            let parent = node.parent;

            if (node.childrenCount == 2) {
                let successor = this._findNextLarger(node);
                node.value = successor.value;
                return (true && this._remove(successor));
            }

            if (node.hasLeftChild) {
                this._replaceNodeInParent(node, node.leftChild);
                this._count --;
            }
            else if(node.hasRightChild) {
                this._replaceNodeInParent(node, node.rightChild);
            }
        }

        /**
         * 向树中插入一个新节点
         * @param newNode 
         * @returns 
         */
        protected _insertNode(newNode: BSTNode<T>) {
            if (this.root == null) {
                this.root = newNode;
                this._count ++;
                return true;
            }

            if (newNode.parent == null)
                newNode.parent = this.root;

            // 检查值是否相等以及是否允许插入重复项
            if (this._allowDuplicates == false && Comparers.isEqualTo(newNode.parent.value, newNode.value))
                return false;

            if (Comparers.isGreaterThan(newNode.parent.value, newNode.value)) {
                if (newNode.parent.hasLeftChild == false) {
                    newNode.parent.leftChild = newNode;

                    this._count ++;

                    return true;
                }

                newNode.parent = newNode.parent.leftChild;
                return this._insertNode(newNode);
            }

            if (newNode.parent.hasRightChild == false) {
                newNode.parent.rightChild = newNode;

                this._count ++;
                return true;
            }

            newNode.parent = newNode.parent.rightChild;
            return this._insertNode(newNode);
        }

        /**
         * 递归计算特定节点的树高
         * @param node 
         * @returns 
         */
        protected _getTreeHeight(node: BSTNode<T>) {
            if (node == null)
                return 0;

            if (node.isLeafNode)
                return 1;

            if (node.childrenCount == 2)
                return (1 + Math.max(this._getTreeHeight(node.leftChild), this._getTreeHeight(node.rightChild)));

            if (node.hasLeftChild)
                return (1 + this._getTreeHeight(node.leftChild));

            return (1 + this._getTreeHeight(node.rightChild));
        }

        /**
         * 在给定值的情况下，在另一个节点的子树中查找一个节点
         * @param currentNode 
         * @param item 
         * @returns 
         */
        protected _findNode(currentNode: BSTNode<T>, item: T): BSTNode<T> {
            if (currentNode == null)
                return currentNode;

            if (Comparers.isEqualTo(item, currentNode.value))
                return currentNode;

            if (currentNode.hasLeftChild && Comparers.isLessThan(item, currentNode.value)) {
                return this._findNode(currentNode.leftChild, item);
            }

            if (currentNode.hasRightChild && Comparers.isGreaterThan(item, currentNode.value)) {
                return this._findNode(currentNode.rightChild, item);
            }

            return null;
        }

        /**
         * 返回子树中的最小节点
         * @param node 
         * @returns 
         */
        protected _findMinNode(node: BSTNode<T>) {
            if (node == null)
                return node;

            let currentNode = node;

            while (currentNode.hasLeftChild)
                currentNode = currentNode.leftChild;

            return currentNode;
        }

        /**
         * 返回子树中的最大节点
         * @param node 
         * @returns 
         */
         protected _findMaxNode(node: BSTNode<T>) {
            if (node == null)
                return node;

            let currentNode = node;

            while (currentNode.hasRightChild)
                currentNode = currentNode.rightChild;

            return currentNode;
        }

        /**
         * 与指定节点相比，查找 value 中的下一个较小节点。
         * @param node 
         * @returns 
         */
        protected _findNextSmaller(node: BSTNode<T>) {
            if (node == null)
                return node;

            if (node.hasLeftChild)
                return this._findMaxNode(node.leftChild);

            let currentNode = node;
            while (currentNode.parent != null && currentNode.isLeftChild)
                currentNode = currentNode.parent;

            return currentNode.parent;
        }

        /**
         * 查找与指定节点相比值中下一个更大的节点
         * @param node 
         * @returns 
         */
        protected _findNextLarger(node: BSTNode<T>) {
            if (node == null)
                return node;

            if (node.hasRightChild)
                return this._findMinNode(node.rightChild);

            let currentNode = node;
            while (currentNode.parent != null && currentNode.isRightChild)
                currentNode = currentNode.parent;

            return currentNode.parent;
        }

        /**
         * 实现有序遍历以查找子树中的所有匹配元素
         * @param currentNode 
         * @param match 
         * @param list 
         * @returns 
         */
        protected _findAll(currentNode: BSTNode<T>, match: (v: T)=>boolean, list: T[]) {
            if (currentNode == null)
                return;

            this._findAll(currentNode.leftChild, match, list);

            if (match(currentNode.value)) {
                list.push(currentNode.value);
            }

            this._findAll(currentNode.rightChild, match, list);
        }

        /**
         * 节点子树的有序遍历。 返回它访问的每个节点。
         * @param currentNode 
         * @param list 
         * @returns 
         */
        protected _inOrderTraverse(currentNode: BSTNode<T>, list: T[]) {
            if (currentNode == null)
                return;

            this._inOrderTraverse(currentNode.leftChild, list);

            list.push(currentNode.value);

            this._inOrderTraverse(currentNode.rightChild, list);
        }

        /**
         * 返回这棵树中元素的数量
         */
        public get count() {
            return this._count;
        }

        /**
         * 检查树是否为空
         */
        public get isEmpty() {
            return this._count == 0;
        }

        /**
         * 返回树的高度
         */
        public get height() {
            if (this.isEmpty)
                return 0;

            let currentNode = this.root;
            return this._getTreeHeight(currentNode);
        }

        public get allowsDuplicates() {
            return this._allowDuplicates;
        }

        /**
         * 向树中插入一个元素
         * @param item 
         */
        public insert(item: T) {
            let newNode = new BSTNode<T>(item);

            // 从根开始递归插入节点。 检查成功状态
            let success = this._insertNode(newNode);

            if (success == false && this._allowDuplicates == false)
                throw new Error("tree does not allow inserting duplicate elements");
        }

        /**
         * 从树中删除一个元素
         * @param item 
         */
        public remove(item: T) {
            if (this.isEmpty)
                throw new Error("tree is empty");

            let node = this._findNode(this.root, item);
            let status = this._remove(node);

            // 如果找到该元素，请将其删除
            if (status == false)
                throw new Error("item was not found");
        }

        /**
         * 从树中删除最小值
         */
        public removeMin() {
            if(this.isEmpty)
                throw new Error("tree is empty");

            let node = this._findMinNode(this.root);
            this._remove(node);
        }

        /**
         * 从树中删除最大值
         */
        public removeMax() {
            if (this.isEmpty)
                throw new Error("tree is empty");

            let node = this._findMaxNode(this.root);
            this._remove(node);
        }

        /**
         * 清除树中的所有元素
         */
        public clear() {
            this.root = null;
            this._count = 0;
        }

        /**
         * 检查项目是否存在
         * @param item 
         * @returns 
         */
        public contains(item: T) {
            return this._findNode(this._root, item) != null;
        }

        /**
         * 查找树中的最小值
         * @returns 
         */
        public findMin() {
            if (this.isEmpty)
                throw new Error("tree is empty");

            return this._findMinNode(this.root).value;
        }

        /**
         * 与指定项相比，在树中查找下一个较小的元素
         * @param item 
         * @returns 
         */
        public findNextSmaller(item: T) {
            let node = this._findNode(this.root, item);
            let nextSmaller = this._findNextSmaller(node);

            if (nextSmaller == null)
                throw new Error("item was not found");

            return nextSmaller.value;
        }

        /**
         * 与指定项相比，在树中查找下一个较大的元素
         * @param item 
         * @returns 
         */
        public findNextLarger(item: T) {
            let node = this._findNode(this.root, item);
            let nextLarger = this._findNextLarger(node);

            if (nextLarger == null)
                throw new Error("item was not found");

            return nextLarger.value;
        }

        /**
         * 查找树中的最大值
         * @returns 
         */
        public findMax() {
            if (this.isEmpty)
                throw new Error("tree is empty");

            return this._findMaxNode(this.root).value;
        }

        /**
         * 在树中找到项目。 如果未找到则抛出异常
         * @param item 
         * @returns 
         */
        public find(item: T) {
            if (this.isEmpty)
                throw new Error("tree is empty");

            let node = this._findNode(this.root, item);

            if (node != null)
                return node.value;

            throw new Error("item was not found");
        }

        /**
         * 给定一个查找函数，找出所有匹配它的元素
         * @param searchPredicate 
         * @returns 
         */
        public findAll(searchPredicate: (t: T)=> boolean) {
            let list = [];
            this._findAll(this.root, searchPredicate, list);

            return list;
        }
    }
}