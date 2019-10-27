import { injectable } from 'inversify';
import { IResettableProvider } from './IResettableProvider';

/**
 * A class to wrap a factory method as a `IResettableProvider<T>`.
 */
@injectable()
export abstract class AbstractProvider<T> implements IResettableProvider<T> {
    private initialized: boolean = false;
    private beingProvided: boolean = false;
    private obj: T | undefined = undefined;
    protected abstract _create(): T;

    provide(): T {
        if (this.beingProvided)
            throw new Error('Circular reference: provider.provide() calls provider.provide()');
        if (!this.initialized) {
            try {
                this.beingProvided = true;
                this.obj = this._create();
                this.initialized = true;
            }
            finally {
                this.beingProvided = false;
            }
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