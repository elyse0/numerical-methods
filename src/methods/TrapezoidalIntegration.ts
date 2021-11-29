import NumericalMethod, {IntegrationInterval} from '@/methods/NumericalMethod'
import {EvalFunction} from 'mathjs'

class TrapezoidalIntegration extends NumericalMethod {

    integral: number
    functionFx: string
    integralFunction: string
    integrationInterval: string

    private constructor(integral: number, functionFx: string, integralFunction: string, integrationInterval: string) {
        super()
        this.integral = integral
        this.functionFx = functionFx
        this.integralFunction = integralFunction
        this.integrationInterval = integrationInterval
    }

    static create(
        functionFx: string,
        interval: Partial<IntegrationInterval>,
        steps: number): TrapezoidalIntegration | null {

        const parsedFunction = this.getParsedFunction(functionFx)
        if (!parsedFunction) {
            console.log("TrapezoidalIntegration: Error parsing function")
            return null
        }
        // FIXME: Verify interval and steps
        if (!this.isIntegrationInterval(interval)) {
            console.log("TrapezoidalIntegration: Integration interval invalid")
            return null
        }
        try {
            const integral = this.method(parsedFunction, interval, steps)
            const functionFxTex = this.getFxEquation(parsedFunction.toString())
            const integralFunction = this.getFxIntegral(functionFx, interval)
            const integrationInterval = this.getIntegrationIntervalString(interval)
            return new TrapezoidalIntegration(integral, functionFxTex, integralFunction, integrationInterval)
        } catch (e) {
            console.log("TrapezoidalIntegration: Critical error when computing method")
            return null
        }
    }

    static method(functionFx: EvalFunction, interval: IntegrationInterval, steps: number): number{
        const a = interval.x0
        const b = interval.x1
        const subintervalWidth = (b - a) / steps

        const xValues: number[] = []
        for (let i = a + subintervalWidth; i <= b - subintervalWidth; i = i + subintervalWidth) {
            xValues.push(i)
        }
        const fxiValues: number[] = xValues.map((x) => this.evaluate(functionFx, x))

        const fxa = this.evaluate(functionFx, a)
        const fxb = this.evaluate(functionFx, b)
        const sumFxi = 2 * this.sum(fxiValues)

        return (subintervalWidth / 2) * (fxa + sumFxi + fxb)
    }
}

export default TrapezoidalIntegration