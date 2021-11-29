import NumericalMethod, {Point} from '@/methods/NumericalMethod'
import {lusolve} from 'mathjs'

interface QuadraticInterpolationResult {
    interpolationFunction: string
}

class QuadraticInterpolation extends NumericalMethod {

    interpolationFunction: string

    private constructor(interpolationFunction: string) {
        super()
        this.interpolationFunction = interpolationFunction
    }

    public static create(points: Partial<Point>[]): QuadraticInterpolation | null {
        if (points.length !== 3) {
            console.log("QuadraticInterpolation: Points must be three")
            return null
        }
        if (!this.isPointsListValid(points)) {
            console.log("QuadraticInterpolation: Points array is not valid")
            return null
        }
        try {
            const quadraticInterpolationResult = this.method(points)
            return new QuadraticInterpolation(quadraticInterpolationResult.interpolationFunction)
        } catch (e) {
            console.log("QuadraticInterpolation: Critical error when computing method")
            return null
        }
    }

    public static method(points: Point[]): QuadraticInterpolationResult{
        //  y = ax^2 + bx + c
        const matrix = points.map((point) => [(point.x * point.x), point.x, 1])
        const columnVector = points.map((point) => point.y)

        const systemSolution = lusolve(matrix, columnVector)  as number[][]
        const flatSystemSolution = systemSolution.flat(1)

        const a = this.getNumberStringMultipliedBySign(flatSystemSolution[0])
        const b = this.getNumberStringMultipliedBySign(flatSystemSolution[1])
        const c = this.getNumberStringMultipliedBySign(flatSystemSolution[2])

        const interpolationFunction = this.getFxEquation(`${a}*x^2${b}*x${c}`)
        return {interpolationFunction}
    }
}

export default QuadraticInterpolation