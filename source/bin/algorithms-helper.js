"use strict";
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
