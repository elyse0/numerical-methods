import {EvalFunction, sign, evaluate, abs, parse} from 'mathjs'

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

class Bisection {

    static method(mathFunction: EvalFunction,
                  initialPoints: BisectionInitialPoints,
                  precision: number = 4): BisectionIteration[] | null {

        // TODO: Find a better way to accept only functions with X
        try {
            mathFunction.evaluate({x: 1})
        } catch (e) {
            return null
        }

        if (compare(initialPoints.p1, initialPoints.p2) >= 0) {
            return null
        }

        const functionValueAtP1 = mathFunction.evaluate({x: initialPoints.p1})
        const functionValueAtP2 = mathFunction.evaluate({x: initialPoints.p2})

        if (functionValueAtP1 === undefined || functionValueAtP2 === undefined)
            return null

        if (functionValueAtP1 * functionValueAtP2 > 0) {
            return null
        }

        if (functionValueAtP1 * functionValueAtP2 === 0) {
            //const root = functionValueAtP1 === 0 ? initialPoints.p1 : initialPoints.p2
            // FIXME: What should I return?
            return null
        }

        // Middle point
        const p3 = sum(initialPoints.p1/2, initialPoints.p2/2)
        const functionValueAtP3 = mathFunction.evaluate({x: p3})

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

        const possibleRoot = evaluate(abs(functionValueAtP3.toFixed(precision)).toString())

        if (possibleRoot === 0) {
            return [bisectionIteration]
        }

        const nextInterval = this.getNextInterval(bisectionIteration)
        return [bisectionIteration].concat(this.iteration(mathFunction, nextInterval, precision))
    }

    static iteration(mathFunction: EvalFunction,
                     initialPoints: BisectionInitialIterationPoints,
                     precision: number): BisectionIteration[] {

        const p3 = sum(initialPoints.p1.x/2, initialPoints.p2.x/2)
        const functionValueAtP3 = mathFunction.evaluate({x: p3})

        const bisectionIteration: BisectionIteration = {
            p1: initialPoints.p1,
            p2: initialPoints.p2,
            p3: {
                x: p3,
                fx: functionValueAtP3,
                sign: sign(functionValueAtP3)
            }
        }

        const possibleRoot = evaluate(abs(functionValueAtP3.toFixed(precision)).toString())

        if (possibleRoot === 0) {
            return [bisectionIteration]
        } else {
            const nextInterval = this.getNextInterval(bisectionIteration)
            return [bisectionIteration].concat(this.iteration(mathFunction, nextInterval, precision))
        }
    }

    static isIntervalValid(mathFunction: EvalFunction, initialPoints: BisectionInitialPoints){

        if (initialPoints.p1 === initialPoints.p2)
            return false

        const f1 = mathFunction.evaluate({x: initialPoints.p1})
        const f2 = mathFunction.evaluate({x: initialPoints.p2})

        return f1 * f2 < 0
    }

    static getNextInterval(bisectionIteration: BisectionIteration): BisectionInitialIterationPoints {

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

const mathFunction = parse('(x^4)+(3*x^3)-3')
console.log(mathFunction.toTex())

console.log(Bisection.method(mathFunction.compile(), {p1: - 3, p2: 2}))