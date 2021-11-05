module algorithms {
    export class BinarySearcher<T extends IComparable<T>> {
        private readonly _collection: T[];
        private readonly _comparer: Comparer<T>;
        private _item: T;
        private _currentItemIndex = 0;
        private _leftIndex = 0;
        private _rightIndex = 0;

        public get current() {
            return this._collection[this._currentItemIndex];
        }

        constructor(collection: T[], comparer: Comparer<T>) {
            if (collection == null)
                throw new Error('collection is null');

            this._collection = collection;
            this._comparer = comparer;
            HeapSorter.heapSort(this._collection);
        }

        /**
         * 在列表中应用二分搜索
         * @param item 
         * @returns 
         */
        public binarySearch(item: T): number {
            let notFound = true;

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
        }

        public moveNext() {
            this._currentItemIndex = this._leftIndex + (this._rightIndex - this._leftIndex) / 2;

            if (this._comparer.compare(this._item, this.current) < 0) {
                this._rightIndex = this._currentItemIndex - 1;
            }
            else if(this._comparer.compare(this._item, this.current) > 0) {
                this._leftIndex = this._currentItemIndex + 1;
            }
            else {
                return false;
            }

            return true;
        }

        public reset() {
            this._currentItemIndex = -1;
            this._leftIndex = 0;
            this._rightIndex = this._collection.length - 1;
        }
    }
}