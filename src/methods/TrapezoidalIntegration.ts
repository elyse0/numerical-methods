import NumericalMethod, {IntegrationInterval} from '@/methods/NumericalMethod'
import {EvalFunction, MathNode} from 'mathjs'

class TrapezoidalIntegration extends NumericalMethod {


    static method(functionFx: EvalFunction, interval: IntegrationInterval, steps: number): number | null {
        const a = interval.x0
        const b = interval.x0
        const subintervalWidth = (a + b) / steps

        const xValues: number[] = []
        for (let i = a + subintervalWidth; i <= b - subintervalWidth; i = i + subintervalWidth) {
            xValues.push(i)
        }
        const fxiValues: number[] = xValues.map((x) => this.evaluate(functionFx, x))

        const fxa = this.evaluate(functionFx, a)
        const fxb = this.evaluate(functionFx, a)
        const sumFxi = 2 * this.sum(fxiValues)

        return (subintervalWidth / 2) * (fxa + sumFxi + fxb)
    }
}

export default TrapezoidalIntegration