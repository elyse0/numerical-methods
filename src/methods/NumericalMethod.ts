import {EvalFunction, evaluate, factorial, MathNode, mean, parse, simplify, std} from "mathjs"

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

enum Sign {
    positive = "+",
    negative = "-"
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

    static sum(numbers: number[]) : number {

        return numbers.reduce((a, b) => a + b, 0)
    }

    static round(number: number, precision: number = 4): number {

        return evaluate(number.toFixed(precision).toString())
    }

    static equal(a: number, b: number, precision: number = 4): boolean {

        return this.round(a, precision) === this.round(b, precision)
    }

    static factorial(number: number): number {

        return factorial(number)
    }

    static isZero(number: number, precision: number = 4): boolean {

        return this.equal(number, 0, precision)
    }

    static isRoot(mathFunction: EvalFunction, number: number, precision: number = 4): boolean {

        const possibleRoot = mathFunction.evaluate({x: number})
        return this.isZero(possibleRoot, precision)
    }

    static isPoint(point: Partial<Point>): point is Point {
        return typeof point.x === 'number' && typeof point.y === "number"
    }

    static isPointsListValid(pointsList: Partial<Point>[]): boolean {
        if (!pointsList.length) {
            return false
        }

        return !pointsList.some((point) => !this.isPoint(point))
    }

    static getNumberStringMultipliedBySign(number: number, sign: Sign = Sign.positive, precision: number = 4): string {

        if (sign === Sign.positive) {
            return number < 0 ? `${number.toPrecision(precision)}` : `+${number.toPrecision(precision)}`
        } else {
            return number < 0 ? `+${number.toPrecision(precision)}` : `-${number.toPrecision(precision)}`
        }
    }

    static getFxEquation(rightHandSide: string, useFractions: boolean = false): string {

        const equation = simplify(rightHandSide, {}, {exactFractions: useFractions}).toTex()
        return `f(x)=${equation}`
    }

    static getFxIntegral(rightHandSide: string, integrationInterval: IntegrationInterval, useFractions: boolean = false): string {

        const a = integrationInterval.x0
        const b = integrationInterval.x1
        const equation = simplify(rightHandSide, {}, {exactFractions: useFractions}).toTex()

        return `\\int_{${a}}^{${b}}(${equation})dx`
    }

    static getIntegrationIntervalString(integrationInterval: IntegrationInterval): string {
        const a = integrationInterval.x0
        const b = integrationInterval.x1
        const integralIntervalBoilerplate = `\\min\\left(0,f\\left(x\\right)\\right)\\le y\\le\\max\\left(0,f\\left(x\\right)\\right)`
        return  integralIntervalBoilerplate + `\\left\\{${a}\\le x\\le ${b}\\right\\}`
    }

    static getLineEquationPointSlope(point: Point, slope: number, precision: number = 4): string {
        const x = point.x
        const y = point.y

        const xWithSign = this.getNumberStringMultipliedBySign(x, Sign.negative, precision)
        const yWithSign = this.getNumberStringMultipliedBySign(y, Sign.positive, precision)

        return this.getFxEquation(`${slope.toFixed(precision)}*(x${xWithSign})${yWithSign}`)
    }

}

export default NumericalMethod
export {Point, Root, IntegrationInterval}