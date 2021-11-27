import NumericalMethod, {Point} from '@/methods/NumericalMethod'
import {EvalFunction} from 'mathjs'

interface RungeKuttaIteration {
    k1: number
    k2: number
    k3: number
    k4: number
    x: number
    y: number
}

class RungeKutta extends NumericalMethod {

    iterations: RungeKuttaIteration[]

    constructor(iterations: RungeKuttaIteration[]) {
        super()
        this.iterations = iterations
    }

    public static create(
        differentialEquation: string,
        initialConditions: Partial<Point>,
        step: number,
        iteration: number = 10
    ): RungeKutta | null {
        const parsedDifferentialEquation = RungeKutta.getParsedFunction(differentialEquation)
        if (!parsedDifferentialEquation) {
            console.log("Error parsing Differential equation")
            return null
        }
        if (!this.isPoint(initialConditions)) {
            console.log("RungeKutta: Initial conditions are invalid")
            return null
        }
        const iterations = RungeKutta.method(
            parsedDifferentialEquation.compile(),
            initialConditions,
            step,
            iteration
        )
        return new RungeKutta(iterations)
    }

    public static method(
        differentialEquation: EvalFunction,
        initialConditions: Point,
        step: number,
        iteration: number = 10
    ): RungeKuttaIteration[] {

        const x = initialConditions.x
        const y = initialConditions.y

        const k1 = differentialEquation.evaluate({x, y})
        const k2 = differentialEquation.evaluate({x: x + (step / 2), y: y + ((step / 2) * k1)})
        const k3 = differentialEquation.evaluate({x: x + (step / 2), y: y + ((step / 2) * k2)})
        const k4 = differentialEquation.evaluate({x: x + step, y: y + (step * k3)})

        const approximation = y + step / 6 * (k1 + (2 * k2) + (2 * k3) + k4)

        console.log("Iteration: " + iteration)

        console.log(k1)
        console.log(k2)
        console.log(k3)
        console.log(k4)
        console.log(approximation)

        const rungeKuttaIteration: RungeKuttaIteration = {k1, k2, k3, k4, x: x + step, y: approximation}

        if (iteration === 0) {
            return [rungeKuttaIteration]
        }

        return RungeKutta.method(
            differentialEquation,
            {x: rungeKuttaIteration.x, y: rungeKuttaIteration.y},
            step,
            iteration - 1)
    }
}

export default RungeKutta