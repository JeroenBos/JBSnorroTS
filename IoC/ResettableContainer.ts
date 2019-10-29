import { Container, interfaces } from 'inversify';
import { IResettableProvider } from './IResettableProvider';
import { assert } from '../contracts';

/**
 * Extends `Container` with an easy way to use IoC for both a service and the provider of that service.
 */
export class ResettableContainer<TLookup, TKey extends string & keyof TLookup = string & keyof TLookup> extends Container {
    private readonly resettableIndentifiers = new Set<TKey>();
    public constructor(
        public readonly identifiers: Readonly<{ [key in TKey]: key }>,
        containerOptions?: interfaces.ContainerOptions
    ) {
        super(containerOptions);
    }

    private getProviderKey(serviceIdentifier: TKey): TKey {
        return serviceIdentifier + 'Provider' as TKey;
    }
    bindResettableProvider<K extends TKey>(serviceIdentifier: K, provider: IResettableProvider<TLookup[TKey]>): void {
        if (provider === undefined)
            throw new Error(`argument 'provider' is undefined`);

        const providerIdentifier = this.getProviderKey(serviceIdentifier);
        this.rebind<IResettableProvider<TLookup[TKey]>>(providerIdentifier).toConstantValue(provider);
        this.rebind<TLookup[TKey]>(serviceIdentifier).toDynamicValue(() => this.getProvider<TKey>(serviceIdentifier).provide());
        this.resettableIndentifiers.add(serviceIdentifier);
    }

    getProvider<K extends TKey>(serviceIdentifier: K): IResettableProvider<TLookup[K]> {
        return super.get<IResettableProvider<TLookup[K]>>(this.getProviderKey(serviceIdentifier));
    }
    /**
     * Creates a new singleton for the service identified by `serviceIdentifier`.
     */
    reset(serviceIdentifier: TKey): void {
        this.getProvider(serviceIdentifier).reset();
    }

    /**
     * Binds the specified identifier.
     */
    // @ts-ignore. Override generic type parameter is different from base method
    bind<K extends TKey>(serviceIdentifier: K): interfaces.BindingToSyntax<TLookup[K]> {
        if (this.isBound(serviceIdentifier)) {
            debugger;
            throw new Error(`This container does not allow binding to the same identifier (${String(serviceIdentifier)}) multiple times`);
        }
        return super.bind<TLookup[K]>(serviceIdentifier);
    }

    /**
     * Rebinds the specified identifier if the container already has it, is binds it otherwise.
     */
    // @ts-ignore. Override generic type parameter is different from base method
    rebind<T>(serviceIdentifier: TKey): interfaces.BindingToSyntax<T> {
        if (this.isBound(serviceIdentifier))
            return super.rebind(serviceIdentifier);
        else
            return super.bind(serviceIdentifier);
    }

    /**
     * Asserts this container has a service for every identifier. 
     */
    assertIsFullyBound(): void {
        for (const key of Object.values<TKey>(this.identifiers)) {
            assert(this.isBound(key), `Binding incomplete: '${key}' is missing`);
        }
    }

    /**
     * Resets all resettable services.
     */
    resetAll(): void {
        this.resettableIndentifiers.forEach(key => {
            const provider = this.getProvider(key);
            provider.reset();
        });
    }

    /**
     * Gets the service associated to the specified key.
     */
    // @ts-ignore. Override generic type parameter is different from base method
    get<K extends TKey>(serviceIdentifier: K): TLookup[K] {
        return super.get(serviceIdentifier);
    }
}