import {create, all} from 'mathjs'
import {EvalFunction} from 'mathjs'

const math = create(all, {})

interface BisectionInitialPoints {
    p1 : number,
    p2: number
}

interface BisectionPoint {
    x: number,
    fx: number,
    sign: number
}

interface BisectionIteration {
    p1: BisectionPoint,
    p2: BisectionPoint,
    p3: BisectionPoint
}

class Bisection {

    static method(mathFunction: EvalFunction, initialPoints: BisectionInitialPoints, precision: number = 4) {

        console.log("Iteration")

        const functionValueAtP1 = mathFunction.evaluate({x: initialPoints.p1})
        const functionValueAtP2 = mathFunction.evaluate({x: initialPoints.p2})

        if (functionValueAtP1 * functionValueAtP2 > 0) {
            return null
        }

        if (functionValueAtP1 * functionValueAtP2 === 0) {
            const root = functionValueAtP1 === 0 ? initialPoints.p1 : initialPoints.p2
            // FIXME: What should it return?
            return {root: root}
        }

        // Middle point
        const p3 = (initialPoints.p1 + initialPoints.p2) / 2
        const functionValueAtP3 = mathFunction.evaluate({x: p3})

        const bisectionIteration: BisectionIteration = {
            p1: {
                x: initialPoints.p1,
                fx: functionValueAtP1,
                sign: math.sign(functionValueAtP1)
            },
            p2: {
                x: initialPoints.p2,
                fx: functionValueAtP2,
                sign: math.sign(functionValueAtP2)
            },
            p3: {
                x: p3,
                fx: functionValueAtP3,
                sign: math.sign(functionValueAtP3)
            }
        }

        const possibleRoot = math.evaluate(math.abs(functionValueAtP3.toFixed(precision)))

        if (possibleRoot === 0) {
            return {root: p3}
        } else {
            const nextInterval = this.getNextInterval(bisectionIteration)
            return [bisectionIteration].concat(this.iteration(nextInterval, precision))
        }

    }

    static iteration(initialPoints: BisectionInitialPoints, precision: number) {

        const p3 = (initialPoints.p1 + initialPoints.p2) / 2
        const functionValueAtP3 = math.evaluate(mathFunction, {x: p3})

        const bisectionIteration: BisectionIteration = {
            p1: initialPoints.p1,
            p2: initialPoints.p2,
            p3: {
                x: p3,
                fx: functionValueAtP3,
                sign: math.sign(functionValueAtP3)
            }
        }

        const possibleRoot = math.evaluate(math.abs(functionValueAtP3.toFixed(precision)))

        if (possibleRoot === 0) {
            return bisectionIteration
        } else {
            const nextInterval = this.getNextInterval(bisectionIteration)
            return [bisectionIteration].concat(this.iteration(nextInterval, precision))
        }
    }

    static getNextInterval(bisectionIteration: BisectionIteration): BisectionInitialPoints {

        let positive;
        let negative;

        if (bisectionIteration.p1.sign === -1){
            negative = bisectionIteration.p1
            positive = bisectionIteration.p2
        } else {
            negative = bisectionIteration.p2
            positive = bisectionIteration.p1
        }

        if (bisectionIteration.p3.sign === -1){
            return {p1: positive, p2: bisectionIteration.p3}
        } else {
            return {p1: negative, p2: bisectionIteration.p3}
        }
    }
}

const mathFunction = math.parse('(x^4)+(3*x^3)-3')
console.log(mathFunction.toTex())

console.log(Bisection.method(mathFunction.compile(), -3, 2))