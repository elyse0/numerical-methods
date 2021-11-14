import NumericalMethod, {IntegrationInterval} from '@/methods/NumericalMethod'
import {MathNode} from 'mathjs'

class TrapezoidalIntegration extends NumericalMethod {


    static method(inputFunctionFx: MathNode, interval: IntegrationInterval, steps: number): number | null {
        const subintervalWidth = (interval.x0 + interval.x1) / steps

        const xValues: number[] = []
        for (let i = interval.x0; i <= interval.x1; i = i + subintervalWidth) {
            xValues.push(i)
        }

        const fxValues: number[] = xValues.map((value) => {
            return TrapezoidalIntegration.evaluate(inputFunctionFx.compile(), value)
        })

        const sumFxi = 2 * fxValues.slice(1, fxValues.length - 1).reduce((a, b) => a + b, 0)
        const completeSum = fxValues[0] + fxValues[fxValues.length - 1] + sumFxi

        return (subintervalWidth / 2) * completeSum
    }
}

export default TrapezoidalIntegration