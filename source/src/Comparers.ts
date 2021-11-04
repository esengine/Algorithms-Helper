module algorithms {
    export class Comparers {
        public static isEqualTo<T extends IComparable<T>>(firstValue: T, secondValue: T) {
            return firstValue == secondValue;
        }

        public static isLessThan<T extends IComparable<T>>(firstValue: T, secondValue: T) {
            return firstValue.compareTo(secondValue) < 0;
        }
    }
}