///<reference path="BinarySearchTree.ts"/>
module algorithms {
    export class AVLTree<T extends IComparable<T>> extends BinarySearchTree<T> {
        protected _root: AVLTreeNode<T>;

        constructor(allowDuplicates: boolean) {
            super(allowDuplicates);
        }

        /**
         * 返回节点的高度
         * @param node 
         * @returns 
         */
        private _getNodeHeight(node: AVLTreeNode<T>) {
            if (node == null)
                return -1;

            return node.height;
        }

        /**
         * 更新节点的高度
         * @param node 
         * @returns 
         */
        private _updateNodeHeight(node: AVLTreeNode<T>) {
            if (node == null)
                return;

            node.height = 1 + Math.max(this._getNodeHeight(node.leftChild as AVLTreeNode<T>), this._getNodeHeight(node.rightChild as AVLTreeNode<T>));
        }

        /**
         * 递归更新节点及其父节点的高度，直到树的根
         * @param node 
         * @returns 
         */
        private _updateHeightRecursive(node: AVLTreeNode<T>) {
            if (node == null)
                return;

            node.height = 1 + Math.max(this._getNodeHeight(node.leftChild as AVLTreeNode<T>), this._getNodeHeight(node.rightChild as AVLTreeNode<T>));

            this._updateHeightRecursive(node.parent as AVLTreeNode<T>);
        }

        /**
         * 返回节点的 AVL 平衡因子
         * @param node 
         * @returns 
         */
        private _getBalanceFactor(node: AVLTreeNode<T>) {
            if (node == null)
                return -1;

            return this._getNodeHeight(node.rightChild as AVLTreeNode<T>) - this._getNodeHeight(node.leftChild as AVLTreeNode<T>);
        }

        /**
         * 在 AVL 树中向左旋转节点
         * @param currentNode 
         * @returns 
         */
        private _rotateLeftAt(currentNode: AVLTreeNode<T>) {
            // 我们检查右节点，因为它将成为旋转的枢轴节点
            if (currentNode == null || currentNode.hasRightChild == false)
                return;

            // 在 *右* 子项上旋转
            let pivotNode = currentNode.rightChild as AVLTreeNode<T>;
            // currentNode 的父节点
            let parent = currentNode.parent as AVLTreeNode<T>;
            // 检查 currentNode 是否是它父节点的左节点
            let isLeftChild = currentNode.isLeftChild;
            // 检查 currentNode 是否为 Root
            let isRootNode = currentNode == this.root;

            // 执行旋转
            currentNode.rightChild = pivotNode.leftChild;
            pivotNode.leftChild = currentNode;

            // 更新父引用
            currentNode.parent = pivotNode;
            pivotNode.parent = parent;

            if (currentNode.hasRightChild)
                currentNode.rightChild.parent = currentNode;

            // 如有必要，更新整个树的根
            if (isRootNode)
                this.root = pivotNode;

            // 更新原始父节点的子节点
            if (isLeftChild)
                parent.leftChild = pivotNode;
            else if(parent != null)
                parent.rightChild = pivotNode;

            // 更新每个节点的 AVL 高度
            this._updateHeightRecursive(currentNode);
        }

        /**
         * 在 AVL 树中向右旋转节点
         * @param currentNode 
         * @returns 
         */
        private _rotateRightAt(currentNode: AVLTreeNode<T>) {
            if (currentNode == null || currentNode.hasLeftChild == false)
                return;

            let pivotNode = currentNode.leftChild as AVLTreeNode<T>;
            let parent = currentNode.parent as AVLTreeNode<T>;
            let isLeftChild = currentNode.isLeftChild;
            let isRootNode = currentNode == this.root;

            currentNode.leftChild = pivotNode.rightChild;
            pivotNode.rightChild = currentNode;

            currentNode.parent = pivotNode;
            pivotNode.parent = parent;

            if (currentNode.hasLeftChild)
                currentNode.leftChild.parent = currentNode;

            if (isRootNode)
                this.root = pivotNode;

            if (isLeftChild)
                parent.leftChild = pivotNode;
            else if(parent != null)
                parent.rightChild = pivotNode;

            this._updateHeightRecursive(currentNode);
        }

        /**
         * 重新平衡节点周围的树
         * @param currentNode 
         * @returns 
         */
        private _rebalanceSubtreeTreeAt(currentNode: AVLTreeNode<T>) {
            if (currentNode == null)
                return;

            let balance = this._getBalanceFactor(currentNode);

            // 仅当平衡因子小于 -1 或大于 +1 时才平衡树
            if (Math.abs(balance) >= 2) {
                if (balance > 0) {
                    let rightSubtreeBalance = this._getBalanceFactor(currentNode.rightChild as AVLTreeNode<T>);
                    
                    if (rightSubtreeBalance == 0 || rightSubtreeBalance == 1) {
                        this._rotateLeftAt(currentNode);
                    }
                    else if(rightSubtreeBalance == -1) {
                        this._rotateRightAt(currentNode.rightChild as AVLTreeNode<T>);

                        this._rotateLeftAt(currentNode);
                    }
                }
                else {
                    let leftSubtreeBalance = this._getBalanceFactor(currentNode.leftChild as AVLTreeNode<T>);

                    if (leftSubtreeBalance == 0 || leftSubtreeBalance == 1) {
                        this._rotateRightAt(currentNode);
                    }
                    else if(leftSubtreeBalance == -1) {
                        this._rotateLeftAt(currentNode.leftChild as AVLTreeNode<T>);

                        this._rotateRightAt(currentNode);
                    }
                }
            }
        }

        /**
         * 围绕节点重新平衡整个树
         * @param node 
         */
        private _rebalanceTreeAt(node: AVLTreeNode<T>) {
            let currentNode = node;
            while (currentNode != null) {
                this._updateHeightRecursive(currentNode);

                let left = currentNode.leftChild as AVLTreeNode<T>;
                let right = currentNode.rightChild as AVLTreeNode<T>;

                if (this._getNodeHeight(left) >= 2 + this._getNodeHeight(right)) {
                    if (currentNode.hasLeftChild && this._getNodeHeight(left.leftChild as AVLTreeNode<T>) >= this._getNodeHeight(left.rightChild as AVLTreeNode<T>)) {
                        this._rotateRightAt(currentNode);
                    }
                    else {
                        this._rotateLeftAt(currentNode.leftChild as AVLTreeNode<T>);
                        this._rotateRightAt(currentNode);
                    }
                } else if(this._getNodeHeight(right) >= 2 + this._getNodeHeight(left)) {
                    if (currentNode.hasRightChild && this._getNodeHeight(right.rightChild as AVLTreeNode<T>) >= this._getNodeHeight(right.leftChild as AVLTreeNode<T>)) {
                        this._rotateLeftAt(currentNode);
                    } else {
                        this._rotateRightAt(currentNode.rightChild as AVLTreeNode<T>);
                        this._rotateLeftAt(currentNode);
                    }
                }

                currentNode = currentNode.parent as AVLTreeNode<T>;
            }
        }

        /**
         * 将元素列表插入到树中
         * @param item 
         */
        public insert(item: T) {
            let newNode = new AVLTreeNode<T>(item);

            let success = this._insertNode(newNode);

            if (success == false && this._allowDuplicates == false)
                throw new Error("Tree does not allow inserting duplicate elements");

            this._rebalanceTreeAt(newNode);
        }

        /**
         * 从树中删除一个项目
         * @param item 
         */
        public remove(item: T) {
            if (this.isEmpty)
                throw new Error("tree is empty");

            let node = this._findNode(this.root, item) as AVLTreeNode<T>;
            let status = this._remove(node);

            if (status == true) {
                this._rebalanceTreeAt(node);
            } else {
                throw new Error("item was not found");
            }
        }

        /**
         * 从树中删除最小值
         */
        public removeMin() {
            if (this.isEmpty)
                throw new Error("tree is empty");

            let node = this._findMinNode(this.root) as AVLTreeNode<T>;
            this._remove(node);
            this._rebalanceSubtreeTreeAt(node);
        }

        /**
         * 从树中删除最大值
         */
        public removeMax() {
            if (this.isEmpty)
                throw new Error("tree is empty");

            let node = this._findMaxNode(this.root) as AVLTreeNode<T>;
            this._remove(node);
            this._rebalanceTreeAt(node);
        }
    }
}