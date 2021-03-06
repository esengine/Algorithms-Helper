"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var algorithms;
(function (algorithms) {
    var TRaversalMode;
    (function (TRaversalMode) {
        TRaversalMode[TRaversalMode["inOrder"] = 0] = "inOrder";
        TRaversalMode[TRaversalMode["preOrder"] = 1] = "preOrder";
        TRaversalMode[TRaversalMode["postOrder"] = 2] = "postOrder";
    })(TRaversalMode = algorithms.TRaversalMode || (algorithms.TRaversalMode = {}));
    /**
     * ??????????????????????????????????????????
     */
    var BinarySearchTree = /** @class */ (function () {
        /**
         * ??????allowDuplictes ?????????false???????????????????????????
         * @param allowDuplicates
         */
        function BinarySearchTree(allowDuplicates) {
            if (allowDuplicates === void 0) { allowDuplicates = true; }
            this._count = 0;
            this._allowDuplicates = allowDuplicates;
            this.root = null;
        }
        Object.defineProperty(BinarySearchTree.prototype, "root", {
            get: function () {
                return this._root;
            },
            set: function (value) {
                this._root = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * ????????????????????????????????????????????? newValue
         * @param node
         * @param newNode
         */
        BinarySearchTree.prototype._replaceNodeInParent = function (node, newNode) {
            if (newNode === void 0) { newNode = null; }
            if (node.parent != null) {
                if (node.isLeftChild)
                    node.parent.leftChild = newNode;
                else
                    node.parent.rightChild = newNode;
            }
            else {
                this.root = newNode;
            }
            if (newNode != null)
                newNode.parent = node.parent;
        };
        /**
         * ?????????????????????
         * @param node
         * @returns
         */
        BinarySearchTree.prototype._remove = function (node) {
            if (node == null)
                return false;
            var parent = node.parent;
            if (node.childrenCount == 2) {
                var successor = this._findNextLarger(node);
                node.value = successor.value;
                return (true && this._remove(successor));
            }
            if (node.hasLeftChild) {
                this._replaceNodeInParent(node, node.leftChild);
                this._count--;
            }
            else if (node.hasRightChild) {
                this._replaceNodeInParent(node, node.rightChild);
            }
        };
        /**
         * ??????????????????????????????
         * @param newNode
         * @returns
         */
        BinarySearchTree.prototype._insertNode = function (newNode) {
            if (this.root == null) {
                this.root = newNode;
                this._count++;
                return true;
            }
            if (newNode.parent == null)
                newNode.parent = this.root;
            // ??????????????????????????????????????????????????????
            if (this._allowDuplicates == false && algorithms.Comparers.isEqualTo(newNode.parent.value, newNode.value))
                return false;
            if (algorithms.Comparers.isGreaterThan(newNode.parent.value, newNode.value)) {
                if (newNode.parent.hasLeftChild == false) {
                    newNode.parent.leftChild = newNode;
                    this._count++;
                    return true;
                }
                newNode.parent = newNode.parent.leftChild;
                return this._insertNode(newNode);
            }
            if (newNode.parent.hasRightChild == false) {
                newNode.parent.rightChild = newNode;
                this._count++;
                return true;
            }
            newNode.parent = newNode.parent.rightChild;
            return this._insertNode(newNode);
        };
        /**
         * ?????????????????????????????????
         * @param node
         * @returns
         */
        BinarySearchTree.prototype._getTreeHeight = function (node) {
            if (node == null)
                return 0;
            if (node.isLeafNode)
                return 1;
            if (node.childrenCount == 2)
                return (1 + Math.max(this._getTreeHeight(node.leftChild), this._getTreeHeight(node.rightChild)));
            if (node.hasLeftChild)
                return (1 + this._getTreeHeight(node.leftChild));
            return (1 + this._getTreeHeight(node.rightChild));
        };
        /**
         * ???????????????????????????????????????????????????????????????????????????
         * @param currentNode
         * @param item
         * @returns
         */
        BinarySearchTree.prototype._findNode = function (currentNode, item) {
            if (currentNode == null)
                return currentNode;
            if (algorithms.Comparers.isEqualTo(item, currentNode.value))
                return currentNode;
            if (currentNode.hasLeftChild && algorithms.Comparers.isLessThan(item, currentNode.value)) {
                return this._findNode(currentNode.leftChild, item);
            }
            if (currentNode.hasRightChild && algorithms.Comparers.isGreaterThan(item, currentNode.value)) {
                return this._findNode(currentNode.rightChild, item);
            }
            return null;
        };
        /**
         * ??????????????????????????????
         * @param node
         * @returns
         */
        BinarySearchTree.prototype._findMinNode = function (node) {
            if (node == null)
                return node;
            var currentNode = node;
            while (currentNode.hasLeftChild)
                currentNode = currentNode.leftChild;
            return currentNode;
        };
        /**
         * ??????????????????????????????
         * @param node
         * @returns
         */
        BinarySearchTree.prototype._findMaxNode = function (node) {
            if (node == null)
                return node;
            var currentNode = node;
            while (currentNode.hasRightChild)
                currentNode = currentNode.rightChild;
            return currentNode;
        };
        /**
         * ?????????????????????????????? value ??????????????????????????????
         * @param node
         * @returns
         */
        BinarySearchTree.prototype._findNextSmaller = function (node) {
            if (node == null)
                return node;
            if (node.hasLeftChild)
                return this._findMaxNode(node.leftChild);
            var currentNode = node;
            while (currentNode.parent != null && currentNode.isLeftChild)
                currentNode = currentNode.parent;
            return currentNode.parent;
        };
        /**
         * ?????????????????????????????????????????????????????????
         * @param node
         * @returns
         */
        BinarySearchTree.prototype._findNextLarger = function (node) {
            if (node == null)
                return node;
            if (node.hasRightChild)
                return this._findMinNode(node.rightChild);
            var currentNode = node;
            while (currentNode.parent != null && currentNode.isRightChild)
                currentNode = currentNode.parent;
            return currentNode.parent;
        };
        /**
         * ?????????????????????????????????????????????????????????
         * @param currentNode
         * @param match
         * @param list
         * @returns
         */
        BinarySearchTree.prototype._findAll = function (currentNode, match, list) {
            if (currentNode == null)
                return;
            this._findAll(currentNode.leftChild, match, list);
            if (match(currentNode.value)) {
                list.push(currentNode.value);
            }
            this._findAll(currentNode.rightChild, match, list);
        };
        /**
         * ?????????????????????????????? ?????????????????????????????????
         * @param currentNode
         * @param list
         * @returns
         */
        BinarySearchTree.prototype._inOrderTraverse = function (currentNode, list) {
            if (currentNode == null)
                return;
            this._inOrderTraverse(currentNode.leftChild, list);
            list.push(currentNode.value);
            this._inOrderTraverse(currentNode.rightChild, list);
        };
        Object.defineProperty(BinarySearchTree.prototype, "count", {
            /**
             * ?????????????????????????????????
             */
            get: function () {
                return this._count;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BinarySearchTree.prototype, "isEmpty", {
            /**
             * ?????????????????????
             */
            get: function () {
                return this._count == 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BinarySearchTree.prototype, "height", {
            /**
             * ??????????????????
             */
            get: function () {
                if (this.isEmpty)
                    return 0;
                var currentNode = this.root;
                return this._getTreeHeight(currentNode);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BinarySearchTree.prototype, "allowsDuplicates", {
            get: function () {
                return this._allowDuplicates;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * ???????????????????????????
         * @param item
         */
        BinarySearchTree.prototype.insert = function (item) {
            var newNode = new algorithms.BSTNode(item);
            // ????????????????????????????????? ??????????????????
            var success = this._insertNode(newNode);
            if (success == false && this._allowDuplicates == false)
                throw new Error("tree does not allow inserting duplicate elements");
        };
        /**
         * ???????????????????????????
         * @param item
         */
        BinarySearchTree.prototype.remove = function (item) {
            if (this.isEmpty)
                throw new Error("tree is empty");
            var node = this._findNode(this.root, item);
            var status = this._remove(node);
            // ???????????????????????????????????????
            if (status == false)
                throw new Error("item was not found");
        };
        /**
         * ????????????????????????
         */
        BinarySearchTree.prototype.removeMin = function () {
            if (this.isEmpty)
                throw new Error("tree is empty");
            var node = this._findMinNode(this.root);
            this._remove(node);
        };
        /**
         * ????????????????????????
         */
        BinarySearchTree.prototype.removeMax = function () {
            if (this.isEmpty)
                throw new Error("tree is empty");
            var node = this._findMaxNode(this.root);
            this._remove(node);
        };
        /**
         * ???????????????????????????
         */
        BinarySearchTree.prototype.clear = function () {
            this.root = null;
            this._count = 0;
        };
        /**
         * ????????????????????????
         * @param item
         * @returns
         */
        BinarySearchTree.prototype.contains = function (item) {
            return this._findNode(this._root, item) != null;
        };
        /**
         * ????????????????????????
         * @returns
         */
        BinarySearchTree.prototype.findMin = function () {
            if (this.isEmpty)
                throw new Error("tree is empty");
            return this._findMinNode(this.root).value;
        };
        /**
         * ????????????????????????????????????????????????????????????
         * @param item
         * @returns
         */
        BinarySearchTree.prototype.findNextSmaller = function (item) {
            var node = this._findNode(this.root, item);
            var nextSmaller = this._findNextSmaller(node);
            if (nextSmaller == null)
                throw new Error("item was not found");
            return nextSmaller.value;
        };
        /**
         * ????????????????????????????????????????????????????????????
         * @param item
         * @returns
         */
        BinarySearchTree.prototype.findNextLarger = function (item) {
            var node = this._findNode(this.root, item);
            var nextLarger = this._findNextLarger(node);
            if (nextLarger == null)
                throw new Error("item was not found");
            return nextLarger.value;
        };
        /**
         * ????????????????????????
         * @returns
         */
        BinarySearchTree.prototype.findMax = function () {
            if (this.isEmpty)
                throw new Error("tree is empty");
            return this._findMaxNode(this.root).value;
        };
        /**
         * ???????????????????????? ??????????????????????????????
         * @param item
         * @returns
         */
        BinarySearchTree.prototype.find = function (item) {
            if (this.isEmpty)
                throw new Error("tree is empty");
            var node = this._findNode(this.root, item);
            if (node != null)
                return node.value;
            throw new Error("item was not found");
        };
        /**
         * ?????????????????????????????????????????????????????????
         * @param searchPredicate
         * @returns
         */
        BinarySearchTree.prototype.findAll = function (searchPredicate) {
            var list = [];
            this._findAll(this.root, searchPredicate, list);
            return list;
        };
        return BinarySearchTree;
    }());
    algorithms.BinarySearchTree = BinarySearchTree;
})(algorithms || (algorithms = {}));
///<reference path="BinarySearchTree.ts"/>
var algorithms;
///<reference path="BinarySearchTree.ts"/>
(function (algorithms) {
    var AVLTree = /** @class */ (function (_super) {
        __extends(AVLTree, _super);
        function AVLTree(allowDuplicates) {
            return _super.call(this, allowDuplicates) || this;
        }
        /**
         * ?????????????????????
         * @param node
         * @returns
         */
        AVLTree.prototype._getNodeHeight = function (node) {
            if (node == null)
                return -1;
            return node.height;
        };
        /**
         * ?????????????????????
         * @param node
         * @returns
         */
        AVLTree.prototype._updateNodeHeight = function (node) {
            if (node == null)
                return;
            node.height = 1 + Math.max(this._getNodeHeight(node.leftChild), this._getNodeHeight(node.rightChild));
        };
        /**
         * ????????????????????????????????????????????????????????????
         * @param node
         * @returns
         */
        AVLTree.prototype._updateHeightRecursive = function (node) {
            if (node == null)
                return;
            node.height = 1 + Math.max(this._getNodeHeight(node.leftChild), this._getNodeHeight(node.rightChild));
            this._updateHeightRecursive(node.parent);
        };
        /**
         * ??????????????? AVL ????????????
         * @param node
         * @returns
         */
        AVLTree.prototype._getBalanceFactor = function (node) {
            if (node == null)
                return -1;
            return this._getNodeHeight(node.rightChild) - this._getNodeHeight(node.leftChild);
        };
        /**
         * ??? AVL ????????????????????????
         * @param currentNode
         * @returns
         */
        AVLTree.prototype._rotateLeftAt = function (currentNode) {
            // ???????????????????????????????????????????????????????????????
            if (currentNode == null || currentNode.hasRightChild == false)
                return;
            // ??? *???* ???????????????
            var pivotNode = currentNode.rightChild;
            // currentNode ????????????
            var parent = currentNode.parent;
            // ?????? currentNode ?????????????????????????????????
            var isLeftChild = currentNode.isLeftChild;
            // ?????? currentNode ????????? Root
            var isRootNode = currentNode == this.root;
            // ????????????
            currentNode.rightChild = pivotNode.leftChild;
            pivotNode.leftChild = currentNode;
            // ???????????????
            currentNode.parent = pivotNode;
            pivotNode.parent = parent;
            if (currentNode.hasRightChild)
                currentNode.rightChild.parent = currentNode;
            // ????????????????????????????????????
            if (isRootNode)
                this.root = pivotNode;
            // ?????????????????????????????????
            if (isLeftChild)
                parent.leftChild = pivotNode;
            else if (parent != null)
                parent.rightChild = pivotNode;
            // ????????????????????? AVL ??????
            this._updateHeightRecursive(currentNode);
        };
        /**
         * ??? AVL ????????????????????????
         * @param currentNode
         * @returns
         */
        AVLTree.prototype._rotateRightAt = function (currentNode) {
            if (currentNode == null || currentNode.hasLeftChild == false)
                return;
            var pivotNode = currentNode.leftChild;
            var parent = currentNode.parent;
            var isLeftChild = currentNode.isLeftChild;
            var isRootNode = currentNode == this.root;
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
            else if (parent != null)
                parent.rightChild = pivotNode;
            this._updateHeightRecursive(currentNode);
        };
        /**
         * ??????????????????????????????
         * @param currentNode
         * @returns
         */
        AVLTree.prototype._rebalanceSubtreeTreeAt = function (currentNode) {
            if (currentNode == null)
                return;
            var balance = this._getBalanceFactor(currentNode);
            // ???????????????????????? -1 ????????? +1 ???????????????
            if (Math.abs(balance) >= 2) {
                if (balance > 0) {
                    var rightSubtreeBalance = this._getBalanceFactor(currentNode.rightChild);
                    if (rightSubtreeBalance == 0 || rightSubtreeBalance == 1) {
                        this._rotateLeftAt(currentNode);
                    }
                    else if (rightSubtreeBalance == -1) {
                        this._rotateRightAt(currentNode.rightChild);
                        this._rotateLeftAt(currentNode);
                    }
                }
                else {
                    var leftSubtreeBalance = this._getBalanceFactor(currentNode.leftChild);
                    if (leftSubtreeBalance == 0 || leftSubtreeBalance == 1) {
                        this._rotateRightAt(currentNode);
                    }
                    else if (leftSubtreeBalance == -1) {
                        this._rotateLeftAt(currentNode.leftChild);
                        this._rotateRightAt(currentNode);
                    }
                }
            }
        };
        /**
         * ?????????????????????????????????
         * @param node
         */
        AVLTree.prototype._rebalanceTreeAt = function (node) {
            var currentNode = node;
            while (currentNode != null) {
                this._updateHeightRecursive(currentNode);
                var left = currentNode.leftChild;
                var right = currentNode.rightChild;
                if (this._getNodeHeight(left) >= 2 + this._getNodeHeight(right)) {
                    if (currentNode.hasLeftChild && this._getNodeHeight(left.leftChild) >= this._getNodeHeight(left.rightChild)) {
                        this._rotateRightAt(currentNode);
                    }
                    else {
                        this._rotateLeftAt(currentNode.leftChild);
                        this._rotateRightAt(currentNode);
                    }
                }
                else if (this._getNodeHeight(right) >= 2 + this._getNodeHeight(left)) {
                    if (currentNode.hasRightChild && this._getNodeHeight(right.rightChild) >= this._getNodeHeight(right.leftChild)) {
                        this._rotateLeftAt(currentNode);
                    }
                    else {
                        this._rotateRightAt(currentNode.rightChild);
                        this._rotateLeftAt(currentNode);
                    }
                }
                currentNode = currentNode.parent;
            }
        };
        /**
         * ??????????????????????????????
         * @param item
         */
        AVLTree.prototype.insert = function (item) {
            var newNode = new algorithms.AVLTreeNode(item);
            var success = this._insertNode(newNode);
            if (success == false && this._allowDuplicates == false)
                throw new Error("Tree does not allow inserting duplicate elements");
            this._rebalanceTreeAt(newNode);
        };
        /**
         * ???????????????????????????
         * @param item
         */
        AVLTree.prototype.remove = function (item) {
            if (this.isEmpty)
                throw new Error("tree is empty");
            var node = this._findNode(this.root, item);
            var status = this._remove(node);
            if (status == true) {
                this._rebalanceTreeAt(node);
            }
            else {
                throw new Error("item was not found");
            }
        };
        /**
         * ????????????????????????
         */
        AVLTree.prototype.removeMin = function () {
            if (this.isEmpty)
                throw new Error("tree is empty");
            var node = this._findMinNode(this.root);
            this._remove(node);
            this._rebalanceTreeAt(node);
        };
        /**
         * ????????????????????????
         */
        AVLTree.prototype.removeMax = function () {
            if (this.isEmpty)
                throw new Error("tree is empty");
            var node = this._findMaxNode(this.root);
            this._remove(node);
            this._rebalanceTreeAt(node);
        };
        return AVLTree;
    }(algorithms.BinarySearchTree));
    algorithms.AVLTree = AVLTree;
})(algorithms || (algorithms = {}));
var algorithms;
(function (algorithms) {
    var BSTNode = /** @class */ (function () {
        function BSTNode(value, parent, left, right) {
            if (parent === void 0) { parent = null; }
            if (left === void 0) { left = null; }
            if (right === void 0) { right = null; }
            this.value = value;
            this.parent = parent;
            this.leftChild = left;
            this.rightChild = right;
        }
        Object.defineProperty(BSTNode.prototype, "value", {
            get: function () {
                return this._value;
            },
            set: function (value) {
                this._value = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BSTNode.prototype, "parent", {
            get: function () {
                return this._parent;
            },
            set: function (value) {
                this._parent = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BSTNode.prototype, "leftChild", {
            get: function () {
                return this._left;
            },
            set: function (value) {
                this._left = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BSTNode.prototype, "rightChild", {
            get: function () {
                return this._right;
            },
            set: function (value) {
                this._right = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BSTNode.prototype, "hasChildren", {
            /**
             * ???????????????????????????????????????
             */
            get: function () {
                return this.childrenCount > 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BSTNode.prototype, "hasLeftChild", {
            /**
             * ????????????????????????????????????
             */
            get: function () {
                return this.leftChild != null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BSTNode.prototype, "hasOnlyRightChild", {
            /**
             * ????????????????????????????????????????????????????????????????????????
             */
            get: function () {
                return !this.hasLeftChild && this.hasRightChild;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BSTNode.prototype, "hasRightChild", {
            /**
             * ????????????????????????????????????
             */
            get: function () {
                return this.rightChild != null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BSTNode.prototype, "hasOnlyLeftChild", {
            /**
             * ????????????????????????????????????????????????????????????????????????
             */
            get: function () {
                return !this.hasRightChild && this.hasLeftChild;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BSTNode.prototype, "isLeftChild", {
            /**
             * ???????????????????????????????????????????????????
             */
            get: function () {
                return this.parent != null && this.parent.leftChild == this;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BSTNode.prototype, "isRightChild", {
            /**
             * ???????????????????????????????????????????????????
             */
            get: function () {
                return this.parent != null && this.parent.rightChild == this;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BSTNode.prototype, "isLeafNode", {
            /**
             * ?????????????????????????????????
             */
            get: function () {
                return this.childrenCount == 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BSTNode.prototype, "childrenCount", {
            /**
             * ?????????????????????????????????0???1???2?????????????????????????????????
             */
            get: function () {
                var count = 0;
                if (this.hasLeftChild)
                    count++;
                if (this.hasRightChild)
                    count++;
                return count;
            },
            enumerable: true,
            configurable: true
        });
        BSTNode.prototype.compareTo = function (other) {
            if (other == null)
                return -1;
            return this.value.compareTo(other.value);
        };
        return BSTNode;
    }());
    algorithms.BSTNode = BSTNode;
})(algorithms || (algorithms = {}));
///<reference path="./BinarySearchTreeNode.ts" />
var algorithms;
///<reference path="./BinarySearchTreeNode.ts" />
(function (algorithms) {
    var AVLTreeNode = /** @class */ (function (_super) {
        __extends(AVLTreeNode, _super);
        function AVLTreeNode(value, height, parent, left, right) {
            if (height === void 0) { height = 0; }
            if (parent === void 0) { parent = null; }
            if (left === void 0) { left = null; }
            if (right === void 0) { right = null; }
            var _this = _super.call(this, value) || this;
            _this._height = 0;
            _this.height = height;
            _this.parent = parent;
            _this.leftChild = left;
            _this.rightChild = right;
            return _this;
        }
        Object.defineProperty(AVLTreeNode.prototype, "height", {
            get: function () {
                return this._height;
            },
            set: function (value) {
                this._height = value;
            },
            enumerable: true,
            configurable: true
        });
        return AVLTreeNode;
    }(algorithms.BSTNode));
    algorithms.AVLTreeNode = AVLTreeNode;
})(algorithms || (algorithms = {}));
var algorithms;
(function (algorithms) {
    /**
     * ?????????????????????
     */
    var BinaryMaxHeap = /** @class */ (function () {
        function BinaryMaxHeap(capacity, comparer) {
            if (capacity === void 0) { capacity = 0; }
            if (comparer === void 0) { comparer = null; }
            this._heapComparer = algorithms.Comparer.default;
            this._collection = [];
            this._heapComparer = comparer || algorithms.Comparer.default;
        }
        /**
         * ????????????????????? _collection ???????????????
         */
        BinaryMaxHeap.prototype._buildMaxHeap = function () {
            var lastIndex = this._collection.length - 1;
            var lastNodeWithChildren = lastIndex / 2;
            for (var node = lastNodeWithChildren; node >= 0; node--) {
                this._maxHeapify(node, lastIndex);
            }
        };
        /**
         * ?????????????????????????????????
         * @param nodeIndex
         */
        BinaryMaxHeap.prototype._siftUp = function (nodeIndex) {
            var parent = (nodeIndex - 1) / 2;
            while (this._heapComparer.compare(this._collection[nodeIndex], this._collection[parent]) > 0) {
                algorithms.Helpers.swap(this._collection, parent, nodeIndex);
                nodeIndex = parent;
                parent = (nodeIndex - 1) / 2;
            }
        };
        /**
         * ?????????????????????
         * @param nodeIndex
         * @param lastIndex
         */
        BinaryMaxHeap.prototype._maxHeapify = function (nodeIndex, lastIndex) {
            // ???????????? left(node) ??? right(node) ????????????
            var left = (nodeIndex * 2) + 1;
            var right = left + 1;
            var largest = nodeIndex;
            if (left <= lastIndex && this._heapComparer.compare(this._collection[left], this._collection[nodeIndex]) > 0)
                largest = left;
            if (right <= lastIndex && this._heapComparer.compare(this._collection[right], this._collection[largest]) > 0)
                largest = right;
            if (largest != nodeIndex) {
                algorithms.Helpers.swap(this._collection, nodeIndex, largest);
                this._maxHeapify(largest, lastIndex);
            }
        };
        Object.defineProperty(BinaryMaxHeap.prototype, "count", {
            /**
             * ???????????????????????????
             */
            get: function () {
                return this._collection.length;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BinaryMaxHeap.prototype, "isEmpty", {
            /**
             * ????????????????????????
             */
            get: function () {
                return this._collection.length == 0;
            },
            enumerable: true,
            configurable: true
        });
        BinaryMaxHeap.prototype.get = function (index) {
            if (index < 0 || index > this.count || this.count == 0) {
                throw new Error("index out of range");
            }
            return this._collection[index];
        };
        BinaryMaxHeap.prototype.set = function (index, value) {
            if (index < 0 || index >= this.count) {
                throw new Error("index out of range");
            }
            this._collection[index] = value;
            if (index != 0 && this._heapComparer.compare(this._collection[index], this._collection[(index - 1) / 2]) > 0)
                this._siftUp(index);
            else
                this._maxHeapify(index, this._collection.length - 1);
        };
        /**
         * ??????????????? newCollection??? ???????????????
         * @param newCollection
         */
        BinaryMaxHeap.prototype.initialize = function (newCollection) {
            if (newCollection.length > 0) {
                this._collection = [];
                for (var i = 0; i < newCollection.length; ++i) {
                    this._collection.push(newCollection[i]);
                }
                this._buildMaxHeap();
            }
        };
        /**
         * ???????????????????????????
         * @param heapKey
         */
        BinaryMaxHeap.prototype.add = function (heapKey) {
            this._collection.push(heapKey);
            if (!this.isEmpty) {
                this._siftUp(this._collection.length - 1);
            }
        };
        /**
         * ??????????????????????????????
         * @returns
         */
        BinaryMaxHeap.prototype.peek = function () {
            if (this.isEmpty) {
                throw new Error("heap is empty");
            }
            return this._collection[0];
        };
        /**
         * ???????????????????????????????????????
         */
        BinaryMaxHeap.prototype.removeMax = function () {
            if (this.isEmpty) {
                throw new Error("heap is empty");
            }
            var max = 0;
            var last = this._collection.length - 1;
            algorithms.Helpers.swap(this._collection, max, last);
            this._collection.splice(last, 1);
            last--;
            this._maxHeapify(0, last);
        };
        /**
         * ????????????????????????????????????????????????????????????
         * @returns
         */
        BinaryMaxHeap.prototype.extractMax = function () {
            var max = this.peek();
            this.removeMax();
            return max;
        };
        /**
         * ?????????
         */
        BinaryMaxHeap.prototype.clear = function () {
            if (this.isEmpty) {
                throw new Error("heap is empty");
            }
            this._collection.length = 0;
        };
        /**
         * ?????????
         */
        BinaryMaxHeap.prototype.rebuildHeap = function () {
            this._buildMaxHeap();
        };
        /**
         * ??????????????????????????????????????????????????????????????????
         * @param firstMaxHeap
         * @param secondMaxHeap
         */
        BinaryMaxHeap.prototype.union = function (firstMaxHeap, secondMaxHeap) {
            if (firstMaxHeap == null || secondMaxHeap == null)
                throw new Error("null heaps are not allowed");
            var size = firstMaxHeap.count + secondMaxHeap.count;
            var newHeap = new BinaryMaxHeap(size, algorithms.Comparer.default);
            while (firstMaxHeap.isEmpty == false)
                newHeap.add(firstMaxHeap.extractMax());
            while (secondMaxHeap.isEmpty == false)
                newHeap.add(secondMaxHeap.extractMax());
            firstMaxHeap = secondMaxHeap = null;
            return newHeap;
        };
        /**
         * ???????????????????????????????????????????????????????????????
         * @returns
         */
        BinaryMaxHeap.prototype.toMinHeap = function () {
            var newMinHeap = new BinaryMaxHeap(this.count, this._heapComparer);
            newMinHeap.initialize(this._collection);
            return newMinHeap;
        };
        return BinaryMaxHeap;
    }());
    algorithms.BinaryMaxHeap = BinaryMaxHeap;
})(algorithms || (algorithms = {}));
var algorithms;
(function (algorithms) {
    var BinarySearcher = /** @class */ (function () {
        function BinarySearcher(collection, comparer) {
            this._currentItemIndex = 0;
            this._leftIndex = 0;
            this._rightIndex = 0;
            if (collection == null)
                throw new Error('collection is null');
            this._collection = collection;
            this._comparer = comparer;
            algorithms.HeapSorter.heapSort(this._collection);
        }
        Object.defineProperty(BinarySearcher.prototype, "current", {
            get: function () {
                return this._collection[this._currentItemIndex];
            },
            enumerable: true,
            configurable: true
        });
        /**
         * ??????????????????????????????
         * @param item
         * @returns
         */
        BinarySearcher.prototype.binarySearch = function (item) {
            var notFound = true;
            if (item == null) {
                throw new Error('item to search for is not set');
            }
            this.reset();
            this._item = item;
            while ((this._leftIndex <= this._rightIndex) && notFound) {
                notFound = this.moveNext();
            }
            if (notFound) {
                this.reset();
            }
            return this._currentItemIndex;
        };
        BinarySearcher.prototype.moveNext = function () {
            this._currentItemIndex = this._leftIndex + (this._rightIndex - this._leftIndex) / 2;
            if (this._comparer.compare(this._item, this.current) < 0) {
                this._rightIndex = this._currentItemIndex - 1;
            }
            else if (this._comparer.compare(this._item, this.current) > 0) {
                this._leftIndex = this._currentItemIndex + 1;
            }
            else {
                return false;
            }
            return true;
        };
        BinarySearcher.prototype.reset = function () {
            this._currentItemIndex = -1;
            this._leftIndex = 0;
            this._rightIndex = this._collection.length - 1;
        };
        return BinarySearcher;
    }());
    algorithms.BinarySearcher = BinarySearcher;
})(algorithms || (algorithms = {}));
var algorithms;
(function (algorithms) {
    var BinomialCoefficients = /** @class */ (function () {
        function BinomialCoefficients() {
        }
        /**
         * ????????????????????? C(n, k)
         * @param n
         * @returns
         */
        BinomialCoefficients.calculate = function (n) {
            return this.factorial(2 * n) / (this.factorial(n) * this.factorial(n + 1));
        };
        BinomialCoefficients.factorial = function (n) {
            if (n <= 1)
                return 1;
            if (this.Cache.has(n)) {
                return this.Cache.get(n);
            }
            var value = n * this.factorial(n - 1);
            this.Cache[n] = value;
            return value;
        };
        BinomialCoefficients.Cache = new Map();
        return BinomialCoefficients;
    }());
    algorithms.BinomialCoefficients = BinomialCoefficients;
})(algorithms || (algorithms = {}));
var algorithms;
(function (algorithms) {
    /** ???????????? */
    var BubbleSorter = /** @class */ (function () {
        function BubbleSorter() {
        }
        BubbleSorter.bubbleSort = function (collection, comparer) {
            if (comparer === void 0) { comparer = null; }
            comparer = comparer || algorithms.Comparer.default;
            this.bubbleSortAscending(collection, comparer);
        };
        BubbleSorter.bubbleSortAscending = function (collection, comparer) {
            for (var i = 0; i < collection.length; i++) {
                for (var index = 0; index < collection.length - i - 1; index++) {
                    if (comparer.compare(collection[index], collection[index + 1]) > 0) {
                        algorithms.Helpers.swap(collection, index, index + 1);
                    }
                }
            }
        };
        BubbleSorter.bubbleSortDescending = function (collection, comparer) {
            for (var i = 0; i < collection.length; i++) {
                for (var index = 1; index < collection.length - i; index++) {
                    if (comparer.compare(collection[index], collection[index - 1]) > 0) {
                        algorithms.Helpers.swap(collection, index - 1, index);
                    }
                }
            }
        };
        return BubbleSorter;
    }());
    algorithms.BubbleSorter = BubbleSorter;
})(algorithms || (algorithms = {}));
var algorithms;
(function (algorithms) {
    /**
     * ?????? ??????????????? ????????????????????????
     *
     * https://zh.wikipedia.org/wiki/Catalan_number
     */
    var CatalanNumbers = /** @class */ (function () {
        function CatalanNumbers() {
        }
        CatalanNumbers.recursiveHelper = function (rank) {
            if (this.CachedCatalanNumbers.has(rank))
                return this.CachedCatalanNumbers.get(rank);
            var number = 0;
            var lastRank = rank - 1;
            for (var i = 0; i <= lastRank; ++i) {
                var firstPart = this.recursiveHelper(i);
                var secondPart = this.recursiveHelper(lastRank - i);
                if (!this.CachedCatalanNumbers.has(i))
                    this.CachedCatalanNumbers.set(i, firstPart);
                if (!this.CachedCatalanNumbers.has(lastRank - i))
                    this.CachedCatalanNumbers.set(lastRank - i, secondPart);
                number = number + (firstPart * secondPart);
            }
            return number;
        };
        CatalanNumbers.getNumber = function (rank) {
            return this.recursiveHelper(rank);
        };
        /**
         * ???????????????????????????????????????
         * @param rank
         * @returns
         */
        CatalanNumbers.getNumberByBinomialCoefficients = function (rank) {
            return algorithms.BinomialCoefficients.calculate(rank);
        };
        CatalanNumbers.getRange = function (fromRank, toRank) {
            var numbers = [];
            if (fromRank > toRank)
                return null;
            for (var i = fromRank; i <= toRank; ++i)
                numbers.push(this.getNumber(i));
            return numbers;
        };
        /** ??????????????????????????????????????????0 ??? 1??? */
        CatalanNumbers.CachedCatalanNumbers = new Map([[0, 1], [1, 1]]);
        return CatalanNumbers;
    }());
    algorithms.CatalanNumbers = CatalanNumbers;
})(algorithms || (algorithms = {}));
var algorithms;
(function (algorithms) {
    var Comparer = /** @class */ (function () {
        function Comparer() {
        }
        Object.defineProperty(Comparer, "default", {
            get: function () {
                return new DefaultComparer();
            },
            enumerable: true,
            configurable: true
        });
        return Comparer;
    }());
    algorithms.Comparer = Comparer;
    var DefaultComparer = /** @class */ (function (_super) {
        __extends(DefaultComparer, _super);
        function DefaultComparer() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        DefaultComparer.prototype.compare = function (x, y) {
            return x.compareTo(y);
        };
        return DefaultComparer;
    }(Comparer));
    algorithms.DefaultComparer = DefaultComparer;
})(algorithms || (algorithms = {}));
var algorithms;
(function (algorithms) {
    var Comparers = /** @class */ (function () {
        function Comparers() {
        }
        Comparers.isEqualTo = function (firstValue, secondValue) {
            return firstValue == secondValue;
        };
        Comparers.isLessThan = function (firstValue, secondValue) {
            return firstValue.compareTo(secondValue) < 0;
        };
        Comparers.isGreaterThan = function (firstValue, secondValue) {
            return firstValue.compareTo(secondValue) > 0;
        };
        return Comparers;
    }());
    algorithms.Comparers = Comparers;
})(algorithms || (algorithms = {}));
var algorithms;
(function (algorithms) {
    /**
     * ????????????
     */
    var GnomeSorter = /** @class */ (function () {
        function GnomeSorter() {
        }
        GnomeSorter.gnomeSort = function (collection, comparer) {
            if (comparer === void 0) { comparer = null; }
            comparer = comparer || algorithms.Comparer.default;
            this.gnomeSortAscending(collection, comparer);
        };
        GnomeSorter.gnomeSortAscending = function (collection, comparer) {
            var pos = 1;
            while (pos < collection.length) {
                if (comparer.compare(collection[pos], collection[pos - 1]) >= 0) {
                    pos++;
                }
                else {
                    algorithms.Helpers.swap(collection, pos, pos - 1);
                    if (pos > 1) {
                        pos--;
                    }
                }
            }
        };
        GnomeSorter.gnomeSortDescending = function (collection, comparer) {
            var pos = 1;
            while (pos < collection.length) {
                if (comparer.compare(collection[pos], collection[pos - 1]) <= 0) {
                    pos++;
                }
                else {
                    algorithms.Helpers.swap(collection, pos, pos - 1);
                    if (pos > 1) {
                        pos--;
                    }
                }
            }
        };
        return GnomeSorter;
    }());
    algorithms.GnomeSorter = GnomeSorter;
})(algorithms || (algorithms = {}));
var algorithms;
(function (algorithms) {
    var HeapSorter = /** @class */ (function () {
        function HeapSorter() {
        }
        /**
         * ?????????????????? ???????????????
         * @param collection
         * @param comparer
         */
        HeapSorter.heapSort = function (collection, comparer) {
            if (comparer === void 0) { comparer = null; }
            this.heapSortAscending(collection, comparer);
        };
        /**
         * ????????????
         * ???????????????
         * @param collection
         * @param comparer
         */
        HeapSorter.heapSortAscending = function (collection, comparer) {
            if (comparer === void 0) { comparer = null; }
            comparer = comparer || algorithms.Comparer.default;
            var lastIndex = collection.length - 1;
            this.buildMaxHeap(collection, 0, lastIndex, comparer);
            while (lastIndex >= 0) {
                algorithms.Helpers.swap(collection, 0, lastIndex);
                lastIndex--;
                this.maxHeapify(collection, 0, lastIndex, comparer);
            }
        };
        /**
         * ??? collection ?????????????????????
         * @param collection
         * @param firstIndex
         * @param lastIndex
         * @param comparer
         */
        HeapSorter.buildMaxHeap = function (collection, firstIndex, lastIndex, comparer) {
            var lastNodeWithChildren = lastIndex / 2;
            for (var node = lastNodeWithChildren; node >= 0; --node) {
                this.maxHeapify(collection, node, lastIndex, comparer);
            }
        };
        /**
         * ?????????????????????????????????????????????????????????????????????
         * @param collection
         * @param nodeIndex
         * @param lastIndex
         * @param comparer
         */
        HeapSorter.maxHeapify = function (collection, nodeIndex, lastIndex, comparer) {
            var left = (nodeIndex * 2) + 1;
            var right = left + 1;
            var largest = nodeIndex;
            if (left <= lastIndex && comparer.compare(collection[left], collection[nodeIndex]) > 0)
                largest = left;
            if (right <= lastIndex && comparer.compare(collection[right], collection[largest]) > 0)
                largest = right;
            if (largest != nodeIndex) {
                algorithms.Helpers.swap(collection, nodeIndex, largest);
                this.maxHeapify(collection, largest, lastIndex, comparer);
            }
        };
        return HeapSorter;
    }());
    algorithms.HeapSorter = HeapSorter;
})(algorithms || (algorithms = {}));
var algorithms;
(function (algorithms) {
    var Helpers = /** @class */ (function () {
        function Helpers() {
        }
        Helpers.swap = function (list, firstIndex, secondIndex) {
            if (list.length < 2 || firstIndex == secondIndex)
                return;
            var temp = list[firstIndex];
            list[firstIndex] = list[secondIndex];
            list[secondIndex] = temp;
        };
        Helpers.populate = function (list, rows, columns, defaultValue) {
            for (var i = 0; i < rows; i++) {
                for (var j = 0; j < columns; j++) {
                    if (list[i] == null)
                        list[i] = [];
                    list[i][j] = defaultValue;
                }
            }
        };
        return Helpers;
    }());
    algorithms.Helpers = Helpers;
})(algorithms || (algorithms = {}));
var algorithms;
(function (algorithms) {
    var InsertionSorter = /** @class */ (function () {
        function InsertionSorter() {
        }
        InsertionSorter.insertionSort = function (list, comparer) {
            if (comparer === void 0) { comparer = null; }
            comparer = comparer || algorithms.Comparer.default;
            var i, j;
            for (i = 1; i < list.length; i++) {
                var value = list[i];
                j = i - 1;
                while ((j >= 0) && (comparer.compare(list[j], value) > 0)) {
                    list[j + 1] = list[j];
                    j--;
                }
                list[j + 1] = value;
            }
        };
        return InsertionSorter;
    }());
    algorithms.InsertionSorter = InsertionSorter;
})(algorithms || (algorithms = {}));
var algorithms;
(function (algorithms) {
    /** ???????????? */
    var OddEvenSorter = /** @class */ (function () {
        function OddEvenSorter() {
        }
        OddEvenSorter.oddEvenSort = function (collection, comparer) {
            if (comparer === void 0) { comparer = null; }
            comparer = comparer || algorithms.Comparer.default;
            this.oddEvenSortAscending(collection, comparer);
        };
        OddEvenSorter.oddEvenSortAscending = function (collection, comparer) {
            var sorted = false;
            while (!sorted) {
                sorted = true;
                for (var i = 1; i < collection.length - 1; i += 2) {
                    if (comparer.compare(collection[i], collection[i + 1]) > 0) {
                        algorithms.Helpers.swap(collection, i, i + 1);
                        sorted = false;
                    }
                }
                for (var i = 0; i < collection.length - 1; i += 2) {
                    if (comparer.compare(collection[i], collection[i + 1]) > 0) {
                        algorithms.Helpers.swap(collection, i, i + 1);
                        sorted = false;
                    }
                }
            }
        };
        OddEvenSorter.oddEvenSortDescending = function (collection, comparer) {
            var sorted = false;
            while (!sorted) {
                sorted = true;
                for (var i = 1; i < collection.length - 1; i += 2) {
                    if (comparer.compare(collection[i], collection[i + 1]) < 0) {
                        algorithms.Helpers.swap(collection, i, i + 1);
                        sorted = false;
                    }
                }
                for (var i = 0; i < collection.length - 1; i += 2) {
                    if (comparer.compare(collection[i], collection[i + 1]) < 0) {
                        algorithms.Helpers.swap(collection, i, i + 1);
                        sorted = false;
                    }
                }
            }
        };
        return OddEvenSorter;
    }());
    algorithms.OddEvenSorter = OddEvenSorter;
})(algorithms || (algorithms = {}));
var algorithms;
(function (algorithms) {
    var QuickSorter = /** @class */ (function () {
        function QuickSorter() {
        }
        QuickSorter.quickSort = function (collection, comparer) {
            if (comparer === void 0) { comparer = null; }
            var startIndex = 0;
            var endIndex = collection.length - 1;
            comparer = comparer || algorithms.Comparer.default;
            this.internalQuickSort(collection, startIndex, endIndex, comparer);
        };
        /** ???????????????????????? */
        QuickSorter.internalQuickSort = function (collection, leftmostIndex, rightmostIndex, comparer) {
            if (leftmostIndex < rightmostIndex) {
                var wallIndex = this.internalPartition(collection, leftmostIndex, rightmostIndex, comparer);
                this.internalQuickSort(collection, leftmostIndex, wallIndex - 1, comparer);
                this.internalPartition(collection, wallIndex + 1, rightmostIndex, comparer);
            }
        };
        /** ??????????????????????????????????????? */
        QuickSorter.internalPartition = function (collection, leftmostIndex, rightmostIndex, comparer) {
            var wallIndex, piviotIndex;
            piviotIndex = rightmostIndex;
            var pivotValue = collection[piviotIndex];
            wallIndex = leftmostIndex;
            for (var i = leftmostIndex; i <= (rightmostIndex - 1); i++) {
                if (comparer.compare(collection[i], pivotValue) <= 0) {
                    algorithms.Helpers.swap(collection, i, wallIndex);
                    wallIndex++;
                }
            }
            algorithms.Helpers.swap(collection, wallIndex, piviotIndex);
            return wallIndex;
        };
        return QuickSorter;
    }());
    algorithms.QuickSorter = QuickSorter;
})(algorithms || (algorithms = {}));
var algorithms;
(function (algorithms) {
    /**
     * Skip-List(??????) ??????????????????
     *
     * ????????????????????????????????????????????????????????????????????????
     */
    var SkipList = /** @class */ (function () {
        function SkipList(type) {
            this.maxLevel = 32;
            this.probability = 0.5;
            this._type = type;
            this._count = 0;
            this._currentMaxLevel = 1;
            this._firstNode = new algorithms.SkipListNode(new type(), this.maxLevel);
            for (var i = 0; i < this.maxLevel; ++i)
                this._firstNode.forwards[i] = this._firstNode;
        }
        SkipList.prototype._getNextLevel = function () {
            var lvl = 0;
            while (Math.random() < this.probability && lvl <= this._currentMaxLevel && lvl < this.maxLevel)
                ++lvl;
            return lvl;
        };
        Object.defineProperty(SkipList.prototype, "root", {
            get: function () {
                return this._firstNode;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SkipList.prototype, "isEmpty", {
            get: function () {
                return this._count == 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SkipList.prototype, "count", {
            get: function () {
                return this._count;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SkipList.prototype, "level", {
            get: function () {
                return this._currentMaxLevel;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * ????????????????????????
         * @param item
         */
        SkipList.prototype.add = function (item) {
            var current = this._firstNode;
            var toBeUpdated = new Array(this.maxLevel);
            for (var i = this._currentMaxLevel - 1; i >= 0; --i) {
                while (current.forwards[i] != this._firstNode && algorithms.Comparers.isLessThan(current.forwards[i].value, item))
                    current = current.forwards[i];
                toBeUpdated[i] = current;
            }
            current = current.forwards[0];
            var lvl = this._getNextLevel();
            if (lvl > this._currentMaxLevel) {
                for (var i = this._currentMaxLevel; i < lvl; ++i)
                    toBeUpdated[i] = this._firstNode;
                this._currentMaxLevel = lvl;
            }
            var newNode = new algorithms.SkipListNode(item, lvl);
            for (var i = 0; i < lvl; ++i) {
                newNode.forwards[i] = toBeUpdated[i].forwards[i];
                toBeUpdated[i].forwards[i] = newNode;
            }
            ++this._count;
        };
        /**
         * ?????????????????????????????????????????????
         * @param item
         * @returns
         */
        SkipList.prototype.remove = function (item) {
            var deleted;
            var current = this._firstNode;
            var toBeUpdated = new Array(this.maxLevel);
            for (var i = this._currentMaxLevel - 1; i >= 0; --i) {
                while (current.forwards[i] != this._firstNode && algorithms.Comparers.isLessThan(current.forwards[i].value, item))
                    current = current.forwards[i];
                toBeUpdated[i] = current;
            }
            current = current.forwards[0];
            if (algorithms.Comparers.isEqualTo(current.value, item) == false) {
                deleted = new this._type();
                return { result: false, deleted: deleted };
            }
            for (var i = 0; i < this._currentMaxLevel; ++i)
                if (toBeUpdated[i].forwards[i] == current)
                    toBeUpdated[i].forwards[i] = current.forwards[i];
            --this._count;
            while (this._currentMaxLevel > 1 && this._firstNode.forwards[this._currentMaxLevel - 1] == this._firstNode)
                --this._currentMaxLevel;
            deleted = current.value;
            return { result: true, deleted: deleted };
        };
        /**
         * ??????????????????????????????
         * @param item
         * @returns
         */
        SkipList.prototype.contains = function (item) {
            return this.find(item).contains;
        };
        /**
         * ??????????????????????????????????????????
         * @param item
         * @returns
         */
        SkipList.prototype.find = function (item) {
            var itemOut;
            var current = this._firstNode;
            for (var i = this._currentMaxLevel - 1; i >= 0; --i)
                while (current.forwards[i] != this._firstNode && algorithms.Comparers.isLessThan(current.forwards[i].value, item))
                    current = current.forwards[i];
            current = current.forwards[0];
            if (algorithms.Comparers.isEqualTo(current.value, item)) {
                itemOut = current.value;
                return { contains: true, itemOut: itemOut };
            }
            itemOut = new this._type();
            return { contains: false, itemOut: itemOut };
        };
        /**
         * ?????????????????????????????? min ????????? ??????????????????
         * @returns
         */
        SkipList.prototype.deleteMin = function () {
            var min;
            var r = this.tryDeleteMin();
            min = r.result;
            if (!r.delete)
                throw new Error('skipList is empty');
            return min;
        };
        /**
         * ?????????????????????????????????????????????????????? false
         * @returns
         */
        SkipList.prototype.tryDeleteMin = function () {
            var result;
            if (this.isEmpty) {
                result = new this._type();
                return { delete: false, result: result };
            }
            var r = this.remove(this._firstNode.forwards[0].value);
            return { delete: r.result, result: r.deleted };
        };
        /**
         * ??????????????????????????????????????????????????? ??????????????????
         * @returns
         */
        SkipList.prototype.peek = function () {
            var peek;
            var r = this.tryPeek();
            peek = r.result;
            if (!r.peek) {
                throw new Error('skipList is empty');
            }
            return peek;
        };
        /**
         * ????????????????????????????????????????????????????????? false
         * @returns
         */
        SkipList.prototype.tryPeek = function () {
            var result;
            if (this.isEmpty) {
                result = new this._type();
                return { peek: false, result: result };
            }
            result = this._firstNode.forwards[0].value;
            return { peek: true, result: result };
        };
        SkipList.prototype.getEnumerator = function () {
            var node;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        node = this._firstNode;
                        _a.label = 1;
                    case 1:
                        if (!(node.forwards[0] != null && node.forwards[0] != this._firstNode)) return [3 /*break*/, 3];
                        node = node.forwards[0];
                        return [4 /*yield*/, node.value];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 1];
                    case 3: return [2 /*return*/];
                }
            });
        };
        SkipList.prototype.copyTo = function (array, arrayIndex) {
            if (array == null)
                throw new Error('argument is null');
            if (array.length == 0 || arrayIndex >= array.length || arrayIndex < 0)
                throw new Error('index out of range');
            var enumarator = this.getEnumerator();
            for (var i = arrayIndex; i < array.length; ++i) {
                var r = enumarator.next();
                if (!r.done)
                    array[i] = r.value;
                else
                    break;
            }
        };
        SkipList.prototype.clear = function () {
            this._count = 0;
            this._currentMaxLevel = 1;
            this._firstNode = new algorithms.SkipListNode(new this._type(), this.maxLevel);
            for (var i = 0; i < this.maxLevel; ++i)
                this._firstNode.forwards[i] = this._firstNode;
        };
        return SkipList;
    }());
    algorithms.SkipList = SkipList;
})(algorithms || (algorithms = {}));
var algorithms;
(function (algorithms) {
    var SkipListNode = /** @class */ (function () {
        function SkipListNode(value, level) {
            if (level < 0)
                throw new Error("Invalid value for level");
            this._value = value;
            this._forwards = new Array(level);
        }
        Object.defineProperty(SkipListNode.prototype, "value", {
            get: function () {
                return this._value;
            },
            set: function (value) {
                this._value = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SkipListNode.prototype, "forwards", {
            get: function () {
                return this._forwards;
            },
            set: function (value) {
                this._forwards = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SkipListNode.prototype, "level", {
            get: function () {
                return this.forwards.length;
            },
            enumerable: true,
            configurable: true
        });
        SkipListNode.prototype.compareTo = function (other) {
            if (other == null)
                return -1;
            return this.value.compareTo(other.value);
        };
        return SkipListNode;
    }());
    algorithms.SkipListNode = SkipListNode;
})(algorithms || (algorithms = {}));
