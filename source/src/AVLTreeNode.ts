///<reference path="./BinarySearchTreeNode.ts" />
module algorithms {
    export class AVLTreeNode<T extends IComparable<T>> extends BSTNode<T> {
        private _height: number = 0;

        constructor(value: T, height: number = 0, parent: AVLTreeNode<T> = null, left: AVLTreeNode<T> = null, right: AVLTreeNode<T> = null) {
            super(value);
            this.height = height;
            this.parent = parent;
            this.leftChild = left;
            this.rightChild = right;
        }

        public get height() {
            return this._height;
        }

        public set height(value: number) {
            this._height = value;
        }
    }
}