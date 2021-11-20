import {EvalFunction, evaluate, MathNode, parse} from "mathjs"

interface Root {
    x: number,
    fx: number
}

interface Point {
    x: number
    y: number
}

interface IntegrationInterval {
    x0: number
    x1: number
}

abstract class NumericalMethod {

    static getParsedFunction(inputFunction: string): MathNode | null {
        try {
            const parsedFunction = parse(inputFunction)

            if (parsedFunction.equals(parse(""))) {
                return null
            }

            return parsedFunction
        } catch (e) {
            console.log("Error parsing function")
            return null
        }
    }

    static isValidFunction(mathFunction: EvalFunction, point: number = 1): boolean {

        try {
            mathFunction.evaluate({x: point})
            return true
        } catch (e) {
            return false
        }
    }

    static slope(point1: Point, point2: Point): number {
        const x1 = point1.x
        const y1 = point1.y
        const x2 = point2.x
        const y2 = point2.y

        return (y2 - y1) / (x2 - x1)
    }

    static standardDeviation(numbers: number[]): number {
        return std(numbers)
    }

    static evaluate(mathFunction: EvalFunction, point: number): number {

        const evaluation = mathFunction.evaluate({x: point})

        if (evaluation === undefined || evaluation === null) {
            throw Error
        }

        return evaluation
    }

    static mean(numbers: number[]): number {

        return mean(numbers)
    }

    static round(number: number, precision: number = 4): number {

        return evaluate(number.toFixed(precision).toString())
    }

    static equal(a: number, b: number, precision: number = 4): boolean {

        return this.round(a, precision) === this.round(b, precision)
    }

    static isZero(number: number, precision: number = 4): boolean {

        return this.equal(number, 0, precision)
    }

    static isRoot(mathFunction: EvalFunction, number: number, precision: number = 4): boolean {

        const possibleRoot = mathFunction.evaluate({x: number})
        return this.isZero(possibleRoot, precision)
    }
}

export default NumericalMethod
export {Point, Root, IntegrationInterval}