module algorithms {
    export class SkipListNode<T extends IComparable<T>> {
        private _value: T;
        private _forwards: SkipListNode<T>[];

        constructor(value: T, level: number) {
            if (level < 0)
                throw new Error("Invalid value for level");
            
            this._value = value;
            this._forwards = new Array<SkipListNode<T>>(level);
        }

        public get value() {
            return this._value;
        }

        public set value(value: T) {
            this._value = value;
        }

        public get forwards() {
            return this._forwards;
        }

        public set forwards(value: SkipListNode<T>[]) {
            this._forwards = value;
        }

        public get level() {
            return this.forwards.length;
        }

        public compareTo(other: SkipListNode<T>) {
            if (other == null)
                return -1;

            return this.value.compareTo(other.value);
        }
    }
}