module algorithms {
    export class Helpers {
        public static swap<T>(list: T[], firstIndex: number, secondIndex: number) {
            if (list.length < 2 || firstIndex == secondIndex)
                return;

            let temp = list[firstIndex];
            list[firstIndex] = list[secondIndex];
            list[secondIndex] = temp;
        }
    }
}