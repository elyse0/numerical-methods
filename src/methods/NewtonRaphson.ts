import NumericalMethod, {Root} from '@/methods/NumericalMethod'
import {derivative, MathNode} from 'mathjs'

interface NewtonRaphsonIterations {
    x: number
    fx: number
    dfx: number
    approximation: number
}

class NewtonRaphson extends NumericalMethod {

    public parsedFunctionFx: MathNode
    public iterations: NewtonRaphsonIterations[]
    public root: Root
    public precision: number

    private constructor(
        parsedFunctionFx: MathNode,
        iterations: NewtonRaphsonIterations[],
        precision: number
    ) {
        super()
        this.parsedFunctionFx = parsedFunctionFx
        this.iterations = iterations
        this.precision = precision
        this.root = {x: iterations[iterations.length - 1].x, fx: iterations[iterations.length -1].fx}
    }

    static create(inputFunctionFx: string, initialPoint: number, precision: number = 4) {
        const parsedFunctionFx = NewtonRaphson.getParsedFunction(inputFunctionFx)
        if (!parsedFunctionFx) {
            console.log("Error parsing function fx")
            return null
        }
        try {
            const newtonRaphsonIterations = NewtonRaphson.method(parsedFunctionFx, initialPoint, precision)
            if (!newtonRaphsonIterations) {
                console.log("Error computing iterations")
                return null
            }
            return new NewtonRaphson(parsedFunctionFx, newtonRaphsonIterations, precision)
        } catch (e) {
            console.log("Critical error when computing iterations")
            return null
        }
    }

    static method(mathFunctionFx: MathNode,
                  initialPoint: number,
                  precision: number = 4,
                  recursionLimit: number = this.recursionLimit
    ): NewtonRaphsonIterations[] {
        this.verifyRecursionLimit(recursionLimit)

        const derivativeFunctionFx = derivative(mathFunctionFx, "x")

        const functionValueFx = NewtonRaphson.evaluate(mathFunctionFx.compile(), initialPoint)
        const derivativeValueFx = NewtonRaphson.evaluate(derivativeFunctionFx.compile(), initialPoint)

        const newApproximation = initialPoint - (functionValueFx / derivativeValueFx)
        const iteration = {
            x: initialPoint, fx: functionValueFx, dfx: derivativeValueFx, approximation: newApproximation
        }
        const functionValueFxNewIteration = NewtonRaphson.evaluate(mathFunctionFx.compile(), newApproximation)

        if (NewtonRaphson.isZero(functionValueFxNewIteration, precision)) {
            return [iteration].concat([{
                x: newApproximation,
                fx: NewtonRaphson.evaluate(mathFunctionFx.compile(), newApproximation),
                dfx: NewtonRaphson.evaluate(derivativeFunctionFx.compile(), newApproximation),
                approximation: 0
            }])
        }

        return [iteration].concat(
            NewtonRaphson.method(mathFunctionFx, newApproximation, precision, recursionLimit - 1))
    }
}

export default NewtonRaphson
export {NewtonRaphsonIterations}
