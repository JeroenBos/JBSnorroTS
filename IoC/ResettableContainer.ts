import { Container, interfaces } from 'inversify';
import { IResettableProvider } from './IResettableProvider';
import { assert } from '../contracts';

/**
 * Extends `Container` with an easy way to use IoC for both a service and the provider of that service.
 */
export class ResettableContainer<TLookup, TKey extends string & keyof TLookup = string & keyof TLookup> extends Container {
    private readonly resettableIndenfiers = new Set<TKey>();
    public constructor(
        public readonly identifiers: Readonly<{ [key in TKey]: key }>,
        containerOptions?: interfaces.ContainerOptions
    ) {
        super(containerOptions);
    }

    private getProviderKey(serviceIdentifier: TKey): TKey {
        return serviceIdentifier + 'Provider' as TKey;
    }
    bindResettableProvider<K extends TKey, T extends TLookup[TKey]>(serviceIdentifier: K, provider: IResettableProvider<T>): void {
        if (provider === undefined)
            throw new Error(`argument 'provider' is undefined`);

        const providerIdentifier = this.getProviderKey(serviceIdentifier);
        this.rebind<IResettableProvider<T>>(providerIdentifier).toConstantValue(provider);
        this.rebind<T>(serviceIdentifier).toDynamicValue(() => this.getProvider<TKey, T>(serviceIdentifier).provide());
        this.resettableIndenfiers.add(serviceIdentifier);
    }

    getProvider<K extends string & keyof TLookup, T extends TLookup[K] = TLookup[K]>(serviceIdentifier: K): IResettableProvider<T> {
        return this.get<IResettableProvider<T>>(serviceIdentifier + 'Provider');
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
        this.resettableIndenfiers.forEach(key => {
            const provider = this.getProvider(key);
            provider.reset();
        });
    }
}