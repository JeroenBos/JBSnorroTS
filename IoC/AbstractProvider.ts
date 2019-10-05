import { injectable } from 'inversify';
import { IResettableProvider } from './IResettableProvider';

/**
 * A class to wrap a factory method as a `IResettableProvider<T>`.
 */
@injectable()
export abstract class AbstractProvider<T> implements IResettableProvider<T> {
    private initialized: boolean = false;
    private obj: T | undefined = undefined;
    protected abstract _create(): T;

    provide(): T {
        if (!this.initialized) {
            this.obj = this._create();
            this.initialized = true;
        }
        return this.obj as T;
    }
    reset(): void {
        this.initialized = false;
        this.obj = undefined;
    }

    static create<T>(create: () => T): AbstractProvider<T> {
        return new (class Provider extends AbstractProvider<T> {
            _create() {
                return create();
            }
        })();
    }
}