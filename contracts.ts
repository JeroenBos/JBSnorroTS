// The purpose of these methods is to trigger the debugger statement before any exception would be thrown
// because the IDE experience isn't too great when the exceptions are thrown


/**
 * Throws if the specified expression is false.
 * @param expr The expression to compare to true.
 * @param message The error message in case of falsehood.
 */
export function assert(expr: boolean, message = "Assertion failed") {
    if (typeof expr != 'boolean') {
        debugger;
        throw new Error('The specified expression cannot be asserted as it is not boolean');
    }

    if (!expr) {
        debugger;
        throw new Error(message);
    }
}

/** Fails with the specified message. */
export function fail(message = "Assertion failed"): void {
    assert(false, message);
}

/** Fails with the specified message. */
export function unreachable(message = "unreachable"): void {
    assert(false, message);
}