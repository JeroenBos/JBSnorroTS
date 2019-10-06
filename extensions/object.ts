/**
 * Gets whether the specified argument is `{}`.
 */
export function isEmptyObject(obj: any): obj is {} {
    const result = Object.keys(obj).length === 0 && obj.constructor === Object;
    return result;
}