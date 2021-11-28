import NumericalMethod from '@/methods/NumericalMethod'
import {abs, matrix} from 'mathjs'

const isColumnVector = (columnVector: Array<number | null>): columnVector is number[] => {
    if (columnVector.length < 2) {
        return false
    }

    for (let i = 0; i < columnVector.length; i++) {
        if (typeof columnVector[i] !== 'number') {
            return false
        }
    }

    return true
}

const isSquaredMatrix = (squaredMatrix: Array<Array<number | null>>, size: number): squaredMatrix is Array<Array<number>> => {
    for (let row = 0; row < size; row++) {
        for (let column = 0; column < size; column++) {
            try {
                if (typeof squaredMatrix[row][column] !== 'number') {
                    return false
                }
            } catch (e) {
                return false
            }
        }
    }
    return true
}

class Jacobi extends NumericalMethod {

    iterations: number[][]

    private constructor(iterations: number[][]) {
        super()
        this.iterations = iterations
    }

    static create(squaredMatrix: Array<Array<number | null>>, columnVector: Array<number | null>, precision: number = 4): Jacobi | null {
        if (precision < 1) {
            console.log("Jacobi: Precision must be positive")
            return null
        }
        if (!isColumnVector(columnVector)) {
            console.log("Jacobi: Column vector is invalid")
            return null
        }
        const size = columnVector.length
        if (!isSquaredMatrix(squaredMatrix, size)) {
            console.log("Jacobi: Matrix and Column vector sizes don't match")
            return null
        }
        const initialValues = new Array(size).fill(0)
        try{
            const iterations = this.method(squaredMatrix, columnVector, precision, initialValues)
            console.log(iterations)
            return new Jacobi(iterations)
        } catch (e) {
            console.log("Jacobi: Error computing method")
            return null
        }
    }

    static method(squaredMatrix: Array<Array<number>>, columnVector: number[], precision: number = 4, initialValues: number[]): number[][]{

        const x0 = initialValues[0]
        const y0 = initialValues[1]
        const z0 = initialValues[2]

        const a1 = squaredMatrix[0][0]
        const a2 = squaredMatrix[1][0]
        const a3 = squaredMatrix[2][0]

        const b1 = squaredMatrix[0][1]
        const b2 = squaredMatrix[1][1]
        const b3 = squaredMatrix[2][1]

        const c1 = squaredMatrix[0][2]
        const c2 = squaredMatrix[1][2]
        const c3 = squaredMatrix[2][2]

        const d1 = columnVector[0]
        const d2 = columnVector[1]
        const d3 = columnVector[2]

        const xi = (d1 + (abs(b1) * y0) + (abs(c1) * z0)) / a1
        const yi = (d2 + (abs(a2) * x0) + (abs(c2) * z0)) / b2
        const zi = (d3 + (abs(a3) * x0) + (abs(b3) * y0)) / c3

        const iteration = [xi, yi, zi]

        if (this.round((a1 * xi) + (b1 * yi) + (c1 * zi), precision) === d1) {
            return [iteration]
        }

        return [iteration].concat(this.method(squaredMatrix, columnVector, precision, iteration))
    }
}

export default Jacobi
export {isColumnVector, isSquaredMatrix}
