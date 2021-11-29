import {EvalFunction, MathNode} from 'mathjs'

import NumericalMethod, {Root} from '@/methods/NumericalMethod'

interface FixedPointIteration {
    x: number
    fx: number
    gx: number
}

class FixedPoint extends NumericalMethod {

    public parsedFunctionFx: MathNode
    public parsedFunctionGx: MathNode
    public iterations: FixedPointIteration[]
    public precision: number
    public root: Root

    private constructor(parsedFunctionFx: MathNode, parsedFunctionGx: MathNode, fixedPointIterations: FixedPointIteration[], precision: number) {
        super()
        this.parsedFunctionFx = parsedFunctionFx
        this.parsedFunctionGx = parsedFunctionGx
        this.iterations = fixedPointIterations
        this.precision = precision
        this.root = {
            x: fixedPointIterations[fixedPointIterations.length - 1].x,
            fx: fixedPointIterations[fixedPointIterations.length - 1].fx
        }
    }

    static create(inputFunctionFx: string, inputFunctionGx: string, initialPoint: number, precision: number = 4) {
        const parsedFunctionFx = FixedPoint.getParsedFunction(inputFunctionFx)
        if (!parsedFunctionFx) {
            console.log("FixedPoint: Error parsing function fx")
            return null
        }
        const parsedFunctionGx = FixedPoint.getParsedFunction(inputFunctionGx)
        if (!parsedFunctionGx) {
            console.log("FixedPoint: Error parsing function gx")
            return null
        }
        try {
            const fixedPointIterations = FixedPoint.method(parsedFunctionFx.compile(), parsedFunctionGx.compile(), initialPoint, precision)
            if (!fixedPointIterations) {
                console.log("FixedPoint: Error computing iterations")
                return null
            }
            return new FixedPoint(parsedFunctionFx, parsedFunctionGx, fixedPointIterations, precision)
        } catch (e) {
            return null
        }
    }

    static method(mathFunctionFx: EvalFunction,
                  mathFunctionGx: EvalFunction,
                  initialPoint: number,
                  precision: number = 4,
                  recursionLimit: number = this.recursionLimit
    ): FixedPointIteration[] {

        this.verifyRecursionLimit(recursionLimit)

        const functionValueFx = FixedPoint.evaluate(mathFunctionFx, initialPoint)
        const functionValueGx = FixedPoint.evaluate(mathFunctionGx, initialPoint)

        const fixedPointIteration: FixedPointIteration = {
            x: initialPoint,
            fx: functionValueFx,
            gx: functionValueGx
        }

        if (FixedPoint.isZero(fixedPointIteration.fx, precision)) {
            return [fixedPointIteration]
        }

        return [fixedPointIteration].concat(FixedPoint.method(
            mathFunctionFx, mathFunctionGx, fixedPointIteration.gx, precision, recursionLimit - 1))
    }
}

export default FixedPoint
export {FixedPointIteration}