import {sqrt} from 'mathjs'

interface IPoint {
    x: number,
    y: number
}

interface ILeastSquaresInterpolation {
    slope: number;
    yIntercept: number,
    correlationCoefficient: number
}

class LeastSquaresInterpolation {

    public static method(points: IPoint[]): ILeastSquaresInterpolation {

        const numberOfPoints = points.length

        const xSum = points.reduce((sum, point) => sum + point.x, 0)
        const ySum = points.reduce((sum, point) => sum + point.y, 0)

        const xySum = points.reduce((sum, point) => sum + (point.x * point.y), 0)

        const xSquaredSum = points.reduce((sum, point) => sum + (point.x ** 2), 0)
        const ySquaredSum = points.reduce((sum, point) => sum + (point.y ** 2), 0)

        const slope = ((numberOfPoints * xySum) - (xSum * ySum))/((numberOfPoints * xSquaredSum) - (xSum * xSum))
        const yIntercept = ((ySum * xSquaredSum) - (xSum * xySum))/((numberOfPoints * xSquaredSum) - (xSum * xSum))

        const correlationCoefficient = ((numberOfPoints * xySum) - (xSum * ySum))
            /(sqrt(((numberOfPoints * xSquaredSum) - (xSum * xSum))) * sqrt(((numberOfPoints * ySquaredSum) - (ySum * ySum))))

        console.log(slope)
        console.log(yIntercept)
        console.log(correlationCoefficient)

        return {slope, yIntercept, correlationCoefficient}
    }
}

export default LeastSquaresInterpolation

/*
const points = [
    {x: 1, y: 1.5},
    {x: 2, y: 2},
    {x: 3, y: 4},
    {x: 5, y: 4.6},
    {x: 6, y: 4.7},
    {x: 8, y: 8.5},
    {x: 9, y: 8.8},
    {x: 10, y: 9},
]
*/

const points = [
    {x: 178, y: 69.8},
    {x: 160, y: 67.5},
    {x: 183, y: 81},
    {x: 152, y: 60.8},
    {x: 168, y: 70.2},
    {x: 178, y: 75.6},
    {x: 188, y: 80.1},
    {x: 165, y: 72},
    {x: 157, y: 59.4},
    {x: 170, y: 65.3},
    {x: 165, y: 62.6},
    {x: 173, y: 68.4},
]

LeastSquaresInterpolation.method(points)