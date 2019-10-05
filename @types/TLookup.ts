/**
 * Gets the keys type `K` in `TLookup` such that `TLookup[K] extends TValue`.
 */
export type InverseLookup<TLookup, TValue> =
    {
        [K in keyof TLookup]: TLookup[K] extends TValue ? K : never
    };