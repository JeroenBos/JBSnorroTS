import { IProvider } from './IProvider';
/**
 * An object with the ability to provide and reprovide instances of type T.
 */
export interface IResettableProvider<T> extends IProvider<T> {
    reset(): void;
}
