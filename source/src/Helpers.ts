module algorithms {
    export class Helpers {
        public static swap<T>(list: T[], firstIndex: number, secondIndex: number) {
            if (list.length < 2 || firstIndex == secondIndex)
                return;

            let temp = list[firstIndex];
            list[firstIndex] = list[secondIndex];
            list[secondIndex] = temp;
        }

        public static populate<T>(list: T[][], rows: number, columns: number, defaultValue: T) {
            for (let i = 0; i < rows; i ++) {
                for (let j = 0; j < columns; j ++) {
                    if (list[i] == null)
                        list[i] = [];

                    list[i][j] = defaultValue;
                }
            }
        }
    }
}