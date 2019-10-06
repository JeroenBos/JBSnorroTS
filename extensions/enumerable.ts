
export type Grouping<TKey, T> = { key: TKey, elements: T[] };

/**
 * Groups the specified elements by a key.
 */
export function groupBy<TKey, TSource>(sequence: TSource[], keySelector: (key: TSource) => TKey): Grouping<TKey, TSource>[] {
    // I can't figure out the type signature of https://stackoverflow.com/a/34890276/308451
    // I'll just write it myself

    const result: { key: TKey, elements: TSource[] }[] = [];

    sequence.forEach(element => {
        const key = keySelector(element);
        const collection = result.find(collection => collection.key == key); // PERF: dictionary to index in result
        if (collection === undefined) {
            result.push({ key, elements: [element] });
        }
        else {
            collection.elements.push(element);
        }
    });

    return result;

    // there. done. that was way faster than understanding that JS BS
}