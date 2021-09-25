import {create, all} from 'mathjs'

const math = create(all, {})

class Bisection {

    static method(mathFunction, p1, p2, precision=4) {

        console.log("Iteration")

        const functionValueAtP1 = math.evaluate(mathFunction, {x: p1})
        const functionValueAtP2 = math.evaluate(mathFunction, {x: p2})

        if (functionValueAtP1 * functionValueAtP2 === 0) {
            const root = functionValueAtP1 === 0 ? p1 : p2
            return {root: root}
        }

        const positiveAndNegative = Bisection.getPositiveAndNegative(
            {x: p1, fx: functionValueAtP1},
            {x: p2, fx: functionValueAtP2})

        if (!positiveAndNegative) {
            return null
        }

        // Middle point
        const p3 = (p1 + p2) / 2
        const functionValueAtP3 = math.evaluate(mathFunction, {x: p3})

        console.log(functionValueAtP3.toFixed(precision))

        const possibleRoot = math.evaluate(math.abs(functionValueAtP3.toFixed(precision)))

        console.log(possibleRoot)

        if (possibleRoot === 0) {
            return {root: p3}
        }

        if (functionValueAtP3 > 0) {

            const positive = p3
            const negative = positiveAndNegative.negative.x
            return this.method(mathFunction, positive, negative)
        } else {
            const positive = positiveAndNegative.positive.x
            const negative = p3
            return this.method(mathFunction, positive, negative)
        }
    }

    static getPositiveAndNegative(p1, p2) {

        if (p1.fx > 0 && p2.fx < 0) {
            return {positive: p1, negative: p2}
        }

        if (p1.fx < 0 && p2.fx > 0) {
            return {positive: p2, negative: p1}
        }

        return null
    }
}

const mathFunction = math.parse('(x^4)+(3*x^3)-3')
console.log(mathFunction.toTex())

console.log(Bisection.method(mathFunction.toString(), -3, 2))