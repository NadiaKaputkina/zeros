module.exports = function zeros(expression) {
    let pows = {};
    const expressionArr = expression.split('*');

    expressionArr.forEach(function(item, index) {
        const __getAll2 = (j, pow2 = 0) => {
            while (j % 2 === 0) {
                pow2 += 1;
                j /= 2;
            }
            return pow2;
        };

        const __getAll5 = (j, pow5 = 0) => {
            while (j % 5 === 0) {
                pow5 += 1;
                j /= 5;
            }
            return pow5;
        };

        const _factorial = (n) => {
            let pow2 = 0, pow5 = 0;

            for (let i = 1; i <= n; i++) {
                pow2 += __getAll2(i);
                pow5 += __getAll5(i);
            }
            return {pow2: pow2, pow5: pow5, count: 1}
        };


        const _doubleFactorial = (n) => {
            let pow2 = 0, pow5 = 0;

            if (n % 2 === 0) { // n - even number
                for (let i = 2; i <= n; i += 2) {
                    pow2 += __getAll2(i);
                    pow5 += __getAll5(i);
                }
            } else { // n - odd number
                for (let i = 1; i <= n; i += 2) {
                    pow5 += __getAll5(i);
                }
            }
            return {pow2: pow2, pow5: pow5, count: 1}
        };



        const number = parseInt(item);
        const operator = item.match(/!+/)[0];

        switch (operator) {
            case '!':
                if (item in pows) {
                    let {pow2, pow5, count} = pows[item];

                    pows[item] = {
                        pow2: pow2,
                        pow5: pow5,
                        count: count + 1
                    };
                } else {
                    pows[item] = _factorial(number);
                }
                break;
            case '!!':
                if (item in pows) {
                    let {pow2, pow5, count} = pows[item];

                    pows[item] = {
                        pow2: pow2,
                        pow5: pow5,
                        count: count + 1
                    };
                } else {
                    pows[item] = _doubleFactorial(number);
                }
                break;
        }
    });

    let sumAll2 = 0, sumAll5 = 0;

    for (let key in pows) {
        sumAll2 += pows[key].pow2 * pows[key].count;
        sumAll5 += pows[key].pow5 * pows[key].count;
    }

    return Math.min(sumAll2, sumAll5);
}
