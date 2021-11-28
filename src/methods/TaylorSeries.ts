import NumericalMethod from '@/methods/NumericalMethod'
import {derivative, MathNode, simplify} from 'mathjs'

class TaylorSeries extends NumericalMethod {

    iterations: string[]

    private constructor(iterations: string[]) {
        super()
        this.iterations = iterations
    }

    public static create(functionFx: string, iterations: number): TaylorSeries | null {

        const parsedFunctionFx = this.getParsedFunction(functionFx)
        if (!parsedFunctionFx) {
            console.log("TaylorSeries: Error parsing function")
            return null
        }
        if (iterations < 0) {
            console.log("TaylorSeries: Iterations number must be positive")
            return null
        }
        const taylorIterations = this.method(parsedFunctionFx, iterations)
        if (!taylorIterations) {
            console.log("TaylorSeries: Error computing method")
            return null
        }
        return new TaylorSeries(taylorIterations)
    }

    public static method(functionFx: MathNode, iterations: number, currentIteration: number = 0): string[] {

        const derivativeFunctionFx = currentIteration === 0 ? functionFx : derivative(functionFx, "x")
        const derivativeEvaluated = this.evaluate(derivativeFunctionFx, 0)

        const taylorIteration = simplify(
            `(${derivativeEvaluated}/${this.factorial(currentIteration)})*x^${currentIteration}`)

        if (this.equal(currentIteration, iterations)) {
            return [taylorIteration.toTex()]
        }

        return [taylorIteration.toTex()].concat(
            this.method(derivativeFunctionFx, iterations, currentIteration + 1))
    }
}

export default TaylorSeries