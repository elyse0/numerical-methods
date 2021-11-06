import {abs, EvalFunction, evaluate} from "mathjs"

class NumericalMethod {

    static isValidFunction(mathFunction: EvalFunction, point: number = 1): boolean {

        try {
            mathFunction.evaluate({x: point})
            return true
        } catch (e) {
            return false
        }
    }

    static evaluate(mathFunction: EvalFunction, point: number): number {

        const evaluation = mathFunction.evaluate({x: point})

        if (evaluation === undefined || evaluation === null) {
            throw Error
        }

        return evaluation
    }

    static round(number: number, precision: number = 4): number {

        return evaluate(abs(number).toFixed(precision).toString())
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