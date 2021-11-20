import NumericalMethod, {Point} from '@/methods/NumericalMethod'

interface LinearInterpolationResult {
    point: Point
    slope: number
    interpolationFunction: string
}

class LinearInterpolation extends NumericalMethod {

    point: Point
    slope: number
    interpolationFunction: string

    private constructor(point: Point, slope: number, interpolationFunction: string) {
        super()
        this.point = point
        this.slope = slope
        this.interpolationFunction = interpolationFunction
    }

    public static create(points: Point[]): LinearInterpolation | null {
        if (!points.length) {
            console.log("LinearInterpolation: Points array is empty")
            return null
        }
        const method = this.method(points)
        if (!method) {
            console.log("LinearInterpolation: Method failed")
            return null
        }
        return new LinearInterpolation(method.point, method.slope, method.interpolationFunction)
    }

    public static method(points: Point[]): LinearInterpolationResult | null {

        const slopesBetweenPoints = this.getSlopesBetweenPoints(points)

        if (!this.arePointsValid(slopesBetweenPoints)) {
            return null
        }

        console.log(slopesBetweenPoints)

        const point = {
            x: LinearInterpolation.mean(points.map(point => point.x)),
            y: LinearInterpolation.mean(points.map(point => point.y))
        }
        const slope = LinearInterpolation.mean(slopesBetweenPoints)
        const interpolationFunction = LinearInterpolation.getLineEquationPointSlope(point, slope)

        return {point, slope, interpolationFunction}
    }

    public static getSlopesBetweenPoints(points: Point[]): number[] {
        if (points.length < 2) {
            return []
        }

        const slopesArray: number[] = []
        for (let i = 0; i < points.length - 1; i++) {
            const slope = LinearInterpolation.slope(points[i], points[i + 1])
            slopesArray.push(slope)
        }

        return slopesArray
    }

    public static arePointsValid(slopesBetweenPoints: number[]): boolean {
        if (!slopesBetweenPoints.length) {
            return false
        }

        const standardDeviation = LinearInterpolation.standardDeviation(slopesBetweenPoints)
        console.log(standardDeviation)

        return standardDeviation < 0.3
    }
}

export default LinearInterpolation