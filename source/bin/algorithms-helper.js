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
         * 在列表中应用二分搜索
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
         * 计算二项式系数 C(n, k)
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
    /**
     * 计算 卡塔兰数。 动态规划解决方案
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
         * 使用二项式系数算法计算数字
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
        /** 默认情况下，前两个卡塔兰数：0 和 1。 */
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
        return Comparers;
    }());
    algorithms.Comparers = Comparers;
})(algorithms || (algorithms = {}));
var algorithms;
(function (algorithms) {
    var HeapSorter = /** @class */ (function () {
        function HeapSorter() {
        }
        /**
         * 按升序排序。 使用最大堆
         * @param collection
         * @param comparer
         */
        HeapSorter.heapSort = function (collection, comparer) {
            if (comparer === void 0) { comparer = null; }
            this.heapSortAscending(collection, comparer);
        };
        /**
         * 升序排列
         * 使用最大堆
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
         * 从 collection 集合构建最大堆
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
         * 两个索引（包括）之间的元素，在顶部保持最大值。
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
        return Helpers;
    }());
    algorithms.Helpers = Helpers;
})(algorithms || (algorithms = {}));
var algorithms;
(function (algorithms) {
    /**
     * Skip-List(跳表) 数据结构实现
     *
     * 比一般的链表，有更高的查找效率，可比拟二叉查找树
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
         * 将项目添加到列表
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
         * 从列表中删除一个元素然后返回它
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
         * 检查项目是否在列表中
         * @param item
         * @returns
         */
        SkipList.prototype.contains = function (item) {
            return this.find(item).contains;
        };
        /**
         * 查找一个元素并在找到时返回它
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
         * 如果列表为空，则删除 min 元素； 否则抛出异常
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
         * 尝试删除最小元素，如果列表为空则返回 false
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
         * 如果列表不为空，则返回第一个元素； 否则抛出异常
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
         * 尝试返回第一个元素，如果列表为空则返回 false
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
