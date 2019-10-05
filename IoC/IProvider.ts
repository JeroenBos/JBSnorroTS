/**
 * An object with the ability to provide an instance of type `T`.
 */
export interface IProvider<T> {
    provide(): T;
}
