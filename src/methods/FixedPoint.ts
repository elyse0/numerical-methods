import {EvalFunction} from 'mathjs'

import NumericalMethod from '@/methods/NumericalMethod'

interface FixedPointIteration {
    x: number
    fx: number
    gx: number
}

class FixedPoint extends NumericalMethod {

    static method(mathFunctionFx: EvalFunction,
                  mathFunctionGx: EvalFunction,
                  initialPoint: number,
                  precision: number = 4): FixedPointIteration[] | null {

        try {
            const functionValueFx = FixedPoint.evaluate(mathFunctionFx, initialPoint)
            const functionValueGx = FixedPoint.evaluate(mathFunctionGx, initialPoint)

            const fixedPointIteration: FixedPointIteration = {
                x: initialPoint,
                fx: functionValueFx,
                gx: functionValueGx
            }

            if (FixedPoint.equal(fixedPointIteration.fx, 0)){
                return [fixedPointIteration]
            }

            const nextIteration = FixedPoint.method(
                mathFunctionFx, mathFunctionGx, fixedPointIteration.gx, precision)

            if (!nextIteration) {
                return null
            }

            return [fixedPointIteration].concat(nextIteration)
        } catch (e) {
            console.log(e)
            return null
        }
    }
}

export default FixedPoint