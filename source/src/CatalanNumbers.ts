module algorithms {
    /**
     * 计算 卡塔兰数。 动态规划解决方案
     * 
     * https://zh.wikipedia.org/wiki/Catalan_number
     */
    export class CatalanNumbers {
        /** 默认情况下，前两个卡塔兰数：0 和 1。 */
        private static readonly CachedCatalanNumbers: Map<number, number> = new Map<number, number>([[0, 1], [1, 1]]);

        private static recursiveHelper(rank: number) {
            if (this.CachedCatalanNumbers.has(rank))
                return this.CachedCatalanNumbers.get(rank);

            let number = 0;
            let lastRank = rank - 1;

            for (let i = 0; i <= lastRank; ++i) {
                let firstPart = this.recursiveHelper(i);
                let secondPart = this.recursiveHelper(lastRank - i);

                if (!this.CachedCatalanNumbers.has(i))
                    this.CachedCatalanNumbers.set(i, firstPart);

                if (!this.CachedCatalanNumbers.has(lastRank - i))
                    this.CachedCatalanNumbers.set(lastRank - i, secondPart);

                number = number + (firstPart * secondPart);
            }

            return number;
        }

        public static getNumber(rank: number) {
            return this.recursiveHelper(rank);
        }

        /**
         * 使用二项式系数算法计算数字
         * @param rank 
         * @returns 
         */
        public static getNumberByBinomialCoefficients(rank: number) {
            return BinomialCoefficients.calculate(rank);
        }

        public static getRange(fromRank: number, toRank: number) {
            let numbers = [];

            if (fromRank > toRank)
                return null;

            for (let i = fromRank; i <= toRank; ++ i)
                numbers.push(this.getNumber(i));

            return numbers;
        }
    }
}