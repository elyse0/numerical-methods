import NumericalMethod from '@/methods/NumericalMethod'
import {EvalFunction, sign, evaluate, abs, compare, sum, parse} from 'mathjs'

interface BisectionInitialPoints {
    p1 : number,
    p2: number
}

interface BisectionInitialIterationPoints {
    p1: BisectionIterationPoint,
    p2: BisectionIterationPoint
}

interface BisectionIterationPoint {
    x: number,
    fx: number,
    sign: number
}

interface BisectionIteration {
    p1: BisectionIterationPoint,
    p2: BisectionIterationPoint,
    p3: BisectionIterationPoint
}

class Bisection extends NumericalMethod {

    static method(mathFunction: EvalFunction,
                  initialPoints: BisectionInitialPoints,
                  precision: number = 4): BisectionIteration[] | null {

        if (compare(initialPoints.p1, initialPoints.p2) >= 0) {
            return null
        }

        const functionValueAtP1 = Bisection.evaluate(mathFunction, initialPoints.p1)
        const functionValueAtP2 = Bisection.evaluate(mathFunction, initialPoints.p2)

        if (functionValueAtP1 * functionValueAtP2 >= 0) {
            // TODO: What should I return when it's zero
            return null
        }

        // Middle point
        const p3 = sum(initialPoints.p1/2, initialPoints.p2/2)
        const functionValueAtP3 = Bisection.evaluate(mathFunction, p3)

        const bisectionIteration: BisectionIteration = {
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
        }

        if (Bisection.isZero(bisectionIteration.p3.fx)){
            return [bisectionIteration]
        }

        const nextInterval = this.getNextInterval(bisectionIteration)

        return [bisectionIteration].concat(this.iteration(mathFunction, nextInterval, precision))
    }

    static iteration(mathFunction: EvalFunction,
                     initialPoints: BisectionInitialIterationPoints,
                     precision: number,
                     iterationNumber: number = 0
    ): BisectionIteration[] {

        const p3 = sum(initialPoints.p1.x/2, initialPoints.p2.x/2)
        const functionValueAtP3 = Bisection.evaluate(mathFunction, p3)

        const bisectionIteration: BisectionIteration = {
            p1: initialPoints.p1,
            p2: initialPoints.p2,
            p3: {
                x: p3,
                fx: functionValueAtP3,
                sign: sign(functionValueAtP3)
            }
        }

        if (Bisection.isZero(bisectionIteration.p3.fx) || iterationNumber === 1000) {
            return [bisectionIteration]
        }

        const nextInterval = this.getNextInterval(bisectionIteration)
        return [bisectionIteration].concat(this.iteration(mathFunction, nextInterval, precision, iterationNumber++))
    }

    static getNextInterval(bisectionIteration: BisectionIteration): BisectionInitialIterationPoints {

        let positive: BisectionIterationPoint;
        let negative: BisectionIterationPoint;

        if (bisectionIteration.p1.sign === -1){
            negative = bisectionIteration.p1
            positive = bisectionIteration.p2
        } else {
            negative = bisectionIteration.p2
            positive = bisectionIteration.p1
        }

        if (bisectionIteration.p3.sign === -1){
            return {p1: bisectionIteration.p3, p2: positive}
        } else {
            return {p1: negative, p2: bisectionIteration.p3}
        }
    }

    static isIntervalValid(mathFunction: EvalFunction, initialPoints: BisectionInitialPoints){

        if (initialPoints.p1 === initialPoints.p2)
            return false

        const f1 = mathFunction.evaluate({x: initialPoints.p1})
        const f2 = mathFunction.evaluate({x: initialPoints.p2})

        return f1 * f2 < 0
    }
}

export {Bisection, BisectionInitialPoints, BisectionIteration, BisectionIterationPoint}

const mathFunction = parse("x").compile()

const initialPoints = {
    p1: -1,
    p2: 1
}

console.log(Bisection.method(mathFunction, initialPoints))
