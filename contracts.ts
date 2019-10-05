/**
 * Throws if the specified expression is false.
 * @param expr The expression to compare.
 * @param message The error message in case of falsehood.
 */
export function assert(expr: boolean, message = "Assertion failed") {
    if (typeof expr != 'boolean')
        throw new Error('The specified expression cannot be asserted as it is not boolean');

    if (!expr) {
        debugger;
        throw new Error(message);
    }
}

/** Asserts that all elements in the specified sequence are equal, or whether the function is empty. */
export function assertAreIdentical<T>(sequence: Iterable<T>, message = "Assertion failed") {
    let hasElements = false;
    let element = undefined;
    for (const e in sequence) {
        if (!hasElements)
            element = e;
        else if (element != e)
            throw new Error(message);
    }
}