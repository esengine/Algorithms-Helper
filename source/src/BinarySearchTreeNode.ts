module algorithms {
    export class BSTNode<T extends IComparable<T>> {
        private _value: T;
        private _parent: BSTNode<T>;
        private _left: BSTNode<T>;
        private _right: BSTNode<T>;

        constructor(value: T, parent: BSTNode<T> = null, left: BSTNode<T> = null, right: BSTNode<T> = null) {
            this.value = value;
            this.parent = parent;
            this.leftChild = left;
            this.rightChild = right;
        }

        public get value() {
            return this._value;
        }

        public set value(value: T) {
            this._value = value;
        }

        public get parent() {
            return this._parent;
        }

        public set parent(value: BSTNode<T>) {
            this._parent = value;
        }

        public get leftChild() {
            return this._left;
        }

        public set leftChild(value: BSTNode<T>) {
            this._left = value;
        }

        public get rightChild() {
            return this._right;
        }

        public set rightChild(value: BSTNode<T>) {
            this._right = value;
        }

        /**
         * 检查此节点是否有任何子节点
         */
        public get hasChildren() {
            return this.childrenCount > 0;
        }

        /**
         * 检查此节点是否有左子节点
         */
        public get hasLeftChild() {
            return this.leftChild != null;
        }

        /**
         * 检查此节点是否只有一个子节点以及它是否是右子节点
         */
        public get hasOnlyRightChild() {
            return !this.hasLeftChild && this.hasRightChild;
        }

        /**
         * 检查此节点是否有右子节点
         */
        public get hasRightChild() {
            return this.rightChild != null;
        }

        /**
         * 检查此节点是否只有一个子节点以及它是否为左子节点
         */
        public get hasOnlyLeftChild() {
            return !this.hasRightChild && this.hasLeftChild;
        }

        /**
         * 检查此节点是否是其父节点的左子节点
         */
        public get isLeftChild() {
            return this.parent != null && this.parent.leftChild == this;
        }

        /**
         * 检查此节点是否是其父节点的左子节点
         */
        public get isRightChild() {
            return this.parent != null && this.parent.rightChild == this;
        }

        /**
         * 检查此节点是否为叶节点
         */
        public get isLeafNode() {
            return this.childrenCount == 0;
        }

        /**
         * 返回直接子节点的数量：0、1、2（无、左或右，或两者）
         */
        public get childrenCount() {
            let count = 0;

            if (this.hasLeftChild)
                count ++;
            if (this.hasRightChild)
                count ++;

            return count;
        }
        
        public compareTo(other: BSTNode<T>) {
            if (other == null)
                return -1;

            return this.value.compareTo(other.value);
        }
    }
}