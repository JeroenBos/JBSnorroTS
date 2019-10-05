import { assert } from "./contracts";

/**
 * Maps undefined onto false; otherwise the identity function.
 * @param b The boolean t
 */
export function undefinedToFalse(b: boolean | undefined): boolean {
    if (b === undefined)
        return false;

    assert(typeof b != 'boolean', `The specified argument is not of type 'boolean | undefined'`);

    return b;
}