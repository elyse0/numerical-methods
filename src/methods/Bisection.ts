import NumericalMethod, {Root} from '@/methods/NumericalMethod'
import {EvalFunction, sign, compare, sum, MathNode} from 'mathjs'

interface BisectionInitialPoints {
    p1: number,
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

const isBisectionInitialPoints = (initialPoints: Partial<BisectionInitialPoints>): initialPoints is BisectionInitialPoints => {
    return initialPoints.p1 !== null && initialPoints.p1 !== undefined
        && initialPoints.p2 !== null && initialPoints.p2 !== undefined
}

class Bisection extends NumericalMethod {

    public parsedFunction: MathNode
    public bisectionIterations: BisectionIteration[]
    public precision: number
    public root: Root

    private constructor(parsedFunction: MathNode, bisectionIterations: BisectionIteration[], precision: number) {
        super()
        this.parsedFunction = parsedFunction
        this.bisectionIterations = bisectionIterations
        this.precision = precision
        this.root = {
            x: bisectionIterations[bisectionIterations.length - 1].p3.x,
            fx: bisectionIterations[bisectionIterations.length - 1].p3.fx
        }
    }

    static create(inputFunction: string, initialPoints: Partial<BisectionInitialPoints>, precision: number = 4): Bisection | null {
        const parsedFunction = Bisection.getParsedFunction(inputFunction)
        if (!parsedFunction) {
            console.log("Error parsing function")
            return null
        }
        if (!isBisectionInitialPoints(initialPoints)) {
            console.log("Initial points object is invalid")
            return null
        }
        if (!Bisection.isIntervalValid(parsedFunction, initialPoints)) {
            console.log("Interval is invalid")
            return null
        }
        const bisectionIterations = Bisection.method(parsedFunction.compile(), initialPoints, precision)
        if (!bisectionIterations) {
            console.log("Error computing iterations")
            return null
        }
        return new Bisection(parsedFunction, bisectionIterations, precision)
    }

    static method(mathFunction: EvalFunction,
                  initialPoints: BisectionInitialPoints,
                  precision: number = 4): BisectionIteration[] {

        const functionValueAtP1 = Bisection.evaluate(mathFunction, initialPoints.p1)
        const functionValueAtP2 = Bisection.evaluate(mathFunction, initialPoints.p2)

        // Middle point
        const p3 = sum(initialPoints.p1 / 2, initialPoints.p2 / 2)
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

        if (Bisection.isZero(bisectionIteration.p3.fx)) {
            return [bisectionIteration]
        }

        const nextInterval = this.getNextInterval(bisectionIteration)
        return [bisectionIteration].concat(this.iteration(mathFunction, nextInterval, precision))
    }

    static iteration(mathFunction: EvalFunction,
                     initialPoints: BisectionInitialIterationPoints,
                     precision: number,
                     recursionLimit: number = this.recursionLimit,
    ): BisectionIteration[] {
        this.verifyRecursionLimit(recursionLimit)

        const p3 = sum(initialPoints.p1.x / 2, initialPoints.p2.x / 2)
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

        if (Bisection.isZero(bisectionIteration.p3.fx, precision)) {
            return [bisectionIteration]
        }

        const nextInterval = this.getNextInterval(bisectionIteration)
        return [bisectionIteration].concat(this.iteration(mathFunction, nextInterval, precision, recursionLimit - 1))
    }

    static getNextInterval(bisectionIteration: BisectionIteration): BisectionInitialIterationPoints {

        const points = [bisectionIteration.p1, bisectionIteration.p2, bisectionIteration.p3]
        const sortedPoints = points.sort((a, b) => a.x - b.x)

        for (let i = 0; i < sortedPoints.length - 1; i++) {
            if (sortedPoints[i].sign !== sortedPoints[i + 1].sign) {
                return {
                    p1: sortedPoints[i],
                    p2: sortedPoints[i + 1]
                }
            }
        }
        throw Error
    }

    static isIntervalValid(mathFunction: EvalFunction, initialPoints: Partial<BisectionInitialPoints>): boolean {

        if (!isBisectionInitialPoints(initialPoints)) {
            console.log("Initial points object is invalid")
            return false
        }

        if (initialPoints.p1 === initialPoints.p2) {
            return false
        }

        const f1 = Bisection.evaluate(mathFunction, initialPoints.p1)
        const f2 = Bisection.evaluate(mathFunction, initialPoints.p2)

        return f1 * f2 < 0
    }
}

export {Bisection, BisectionInitialPoints, BisectionIteration, BisectionIterationPoint, isBisectionInitialPoints}
