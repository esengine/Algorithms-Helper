module algorithms {
    export class BinomialCoefficients {
        private static readonly Cache: Map<number, number> = new Map();

        /**
         * 计算二项式系数 C(n, k)
         * @param n 
         * @returns 
         */
        public static calculate(n: number) {
            return this.factorial(2 * n) / (this.factorial(n) * this.factorial(n + 1));
        }

        private static factorial(n: number) {
            if (n <= 1)
                return 1;

            if (this.Cache.has(n)) {
                return this.Cache.get(n);
            }

            let value = n * this.factorial(n - 1);
            this.Cache[n] = value;
            return value;
        }
    }
}