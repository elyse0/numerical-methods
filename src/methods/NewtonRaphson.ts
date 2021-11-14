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
        const newtonRaphsonIterations = NewtonRaphson.method(parsedFunctionFx, initialPoint, precision)
        if (!newtonRaphsonIterations) {
            console.log("Error computing iterations")
            return null
        }
        return new NewtonRaphson(parsedFunctionFx, newtonRaphsonIterations, precision)
    }

    static method(mathFunctionFx: MathNode,
                  initialPoint: number,
                  precision: number = 4): NewtonRaphsonIterations[] | null {
        try {
            const derivativeFunctionFx = derivative(mathFunctionFx, "x")

            const functionValueFx = NewtonRaphson.evaluate(mathFunctionFx.compile(), initialPoint)
            const derivativeValueFx = NewtonRaphson.evaluate(derivativeFunctionFx.compile(), initialPoint)

            const newApproximation = initialPoint - (functionValueFx / derivativeValueFx)
            const iteration = {
                x: initialPoint, fx: functionValueFx, dfx: derivativeValueFx, approximation: newApproximation
            }
            const functionValueFxNewIteration = NewtonRaphson.evaluate(mathFunctionFx.compile(), newApproximation)
            console.log("Iteration: " + newApproximation)

            if (NewtonRaphson.isZero(functionValueFxNewIteration, precision)) {
                return [iteration].concat([{
                    x: newApproximation,
                    fx: NewtonRaphson.evaluate(mathFunctionFx.compile(), newApproximation),
                    dfx: NewtonRaphson.evaluate(derivativeFunctionFx.compile(), newApproximation),
                    approximation: 0
                }])
            }

            const nextIteration = NewtonRaphson.method(mathFunctionFx, newApproximation, precision)

            if (!nextIteration) {
                return null
            }

            return [iteration].concat(nextIteration)
        } catch (e) {
            console.log(e)
            return null
        }
    }
}

export default NewtonRaphson
export {NewtonRaphsonIterations}
