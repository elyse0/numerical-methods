import NumericalMethod, {IntegrationInterval} from '@/methods/NumericalMethod'
import {EvalFunction} from 'mathjs'

enum SimpsonIntegrationType {
    OneThird,
    ThreeEighth
}

class SimpsonIntegration extends NumericalMethod {

    type: SimpsonIntegrationType
    integral: number
    functionFx: string
    integralFunction: string
    integrationInterval: string

    private constructor(
        type: SimpsonIntegrationType,
        integral: number,
        functionFx: string,
        integralFunction: string,
        integrationInterval: string){
        super()
        this.type = type
        this.integral = integral
        this.functionFx = functionFx
        this.integralFunction = integralFunction
        this.integrationInterval = integrationInterval
    }

    public static create(
        functionFx: string,
        interval: IntegrationInterval,
        steps: number): SimpsonIntegration | null {
        const parsedFunction = this.getParsedFunction(functionFx)
        if (!parsedFunction) {
            console.log("SimpsonIntegration: Error parsing function")
            return null
        }
        // FIXME: Verify interval and steps
        let integral: number
        let type: SimpsonIntegrationType
        if (steps % 2 === 0) {
            type = SimpsonIntegrationType.OneThird
            integral = this.OneThirdMethod(parsedFunction, interval, steps)
        } else {
            type = SimpsonIntegrationType.ThreeEighth
            integral = this.ThreeEighthMethod(parsedFunction, interval, steps)
        }
        if (!integral) {
            console.log("TrapezoidalIntegration: Error computing method")
            return null
        }
        const functionFxTex = this.getFxEquation(parsedFunction.toString())
        const integralFunction = this.getFxIntegral(functionFx, interval)
        const integrationInterval = this.getIntegrationIntervalString(interval)
        return new SimpsonIntegration(type, integral, functionFxTex, integralFunction, integrationInterval)
    }

    public static OneThirdMethod(functionFx: EvalFunction, interval: IntegrationInterval, steps: number): number {
        const a = interval.x0
        const b = interval.x1
        const subintervalWidth = (b - a) / steps

        const xValues: number[] = []
        for (let i = a + subintervalWidth; i <= b - subintervalWidth; i = i + subintervalWidth) {
            xValues.push(i)
        }
        const fxiValues: number[] = xValues.map((x) => this.evaluate(functionFx, x))

        // Note: They're inverted because we started at 1
        const evenFxi = fxiValues.filter(((value, index) => index % 2 === 1))
        const oddFxi = fxiValues.filter(((value, index) => index % 2 === 0))

        const fxa = this.evaluate(functionFx, a)
        const fxb = this.evaluate(functionFx, b)
        const sumEvenFxi = 2 * this.sum(evenFxi)
        const sumOddFxi = 4 * this.sum(oddFxi)

        return (subintervalWidth / 3) * (fxa + sumEvenFxi + sumOddFxi + fxb)
    }

    public static ThreeEighthMethod(functionFx: EvalFunction, interval: IntegrationInterval, steps: number) {
        // FIXME: Verify that steps is 3
        const a = interval.x0
        const b = interval.x1
        const subIntervalWidth = (b - a) / 3

        const fx0= this.evaluate(functionFx, a)
        const fx1= this.evaluate(functionFx, a + subIntervalWidth)
        const fx2= this.evaluate(functionFx, a + (subIntervalWidth * 2))
        const fx3= this.evaluate(functionFx, b)

        return (subIntervalWidth * (3 / 8)) * (fx0 + (3 * fx1) + (3 * fx2) + fx3)
    }
}

export default SimpsonIntegration