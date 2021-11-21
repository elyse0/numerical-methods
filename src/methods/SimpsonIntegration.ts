import NumericalMethod, {IntegrationInterval} from '@/methods/NumericalMethod'
import {EvalFunction} from 'mathjs'

enum SimpsonIntegrationType {
    OneThird,
    ThreeEighth
}

class SimpsonIntegration extends NumericalMethod {

    public static OneThirdMethod(functionFx: EvalFunction, interval: IntegrationInterval, steps: number) {
        const a = interval.x0
        const b = interval.x1
        const subintervalWidth = (b - a) / steps

        const xValues: number[] = []
        for (let i = a + subintervalWidth; i <= b - subintervalWidth; i = i + subintervalWidth) {
            xValues.push(i)
        }
        const fxiValues: number[] = xValues.map((x) => this.evaluate(functionFx, x))

        // Note: They're inverted because we started at 1
        const oddFxi = fxiValues.filter(((value, index) => index % 2 === 0))
        const evenFxi = fxiValues.filter(((value, index) => index % 2 === 1))

        const fxa = this.evaluate(functionFx, a)
        const fxb = this.evaluate(functionFx, b)
        const sumEvenFxi = 2 * this.sum(evenFxi)
        const sumOddFxi = 4 * this.sum(oddFxi)

        return (subintervalWidth / 3) * (fxa + sumEvenFxi + sumOddFxi + fxb)
    }

    public static ThreeEighthMethod(functionFx: EvalFunction, interval: IntegrationInterval, steps: number) {


    }
}

export default SimpsonIntegration