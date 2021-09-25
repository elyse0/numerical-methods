import { sign, evaluate, abs, parse } from 'mathjs';
class Bisection {
    static method(mathFunction, initialPoints, precision = 4) {
        console.log("Iteration");
        const functionValueAtP1 = mathFunction.evaluate({ x: initialPoints.p1 });
        const functionValueAtP2 = mathFunction.evaluate({ x: initialPoints.p2 });
        if (functionValueAtP1 * functionValueAtP2 > 0) {
            return null;
        }
        if (functionValueAtP1 * functionValueAtP2 === 0) {
            //const root = functionValueAtP1 === 0 ? initialPoints.p1 : initialPoints.p2
            // FIXME: What should I return?
            return null;
        }
        // Middle point
        const p3 = (initialPoints.p1 + initialPoints.p2) / 2;
        const functionValueAtP3 = mathFunction.evaluate({ x: p3 });
        const bisectionIteration = {
            p1: {
                x: initialPoints.p1,
                fx: functionValueAtP1,
                sign: sign(functionValueAtP1)
            },
            p2: {
                x: initialPoints.p2,
                fx: functionValueAtP2,
                sign: sign(functionValueAtP2)
            },
            p3: {
                x: p3,
                fx: functionValueAtP3,
                sign: sign(functionValueAtP3)
            }
        };
        const possibleRoot = evaluate(abs(functionValueAtP3.toFixed(precision)).toString());
        if (possibleRoot === 0) {
            return [bisectionIteration];
        }
        else {
            const nextInterval = this.getNextInterval(bisectionIteration);
            return [bisectionIteration].concat(this.iteration(mathFunction, nextInterval, precision));
        }
    }
    static iteration(mathFunction, initialPoints, precision) {
        const p3 = (initialPoints.p1.x + initialPoints.p2.x) / 2;
        const functionValueAtP3 = mathFunction.evaluate({ x: p3 });
        const bisectionIteration = {
            p1: initialPoints.p1,
            p2: initialPoints.p2,
            p3: {
                x: p3,
                fx: functionValueAtP3,
                sign: sign(functionValueAtP3)
            }
        };
        const possibleRoot = evaluate(abs(functionValueAtP3.toFixed(precision)).toString());
        if (possibleRoot === 0) {
            return [bisectionIteration];
        }
        else {
            const nextInterval = this.getNextInterval(bisectionIteration);
            return [bisectionIteration].concat(this.iteration(mathFunction, nextInterval, precision));
        }
    }
    static getNextInterval(bisectionIteration) {
        let positive;
        let negative;
        if (bisectionIteration.p1.sign === -1) {
            negative = bisectionIteration.p1;
            positive = bisectionIteration.p2;
        }
        else {
            negative = bisectionIteration.p2;
            positive = bisectionIteration.p1;
        }
        if (bisectionIteration.p3.sign === -1) {
            return { p1: positive, p2: bisectionIteration.p3 };
        }
        else {
            return { p1: negative, p2: bisectionIteration.p3 };
        }
    }
}
const mathFunction = parse('(x^4)+(3*x^3)-3');
console.log(mathFunction.toTex());
console.log(Bisection.method(mathFunction.compile(), { p1: -3, p2: 2 }));
//# sourceMappingURL=Bisection.js.map