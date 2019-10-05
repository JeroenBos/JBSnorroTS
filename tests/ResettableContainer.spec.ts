import 'mocha';
import { ResettableContainer } from '../IoC/ResettableContainer';
import { assert } from '../contracts';

describe('ResettableContainer', () => {
    it('Checking typings', () => {
        // arrange
        const container = new ResettableContainer<{ s: string, n: number }>({ s: 's', n: 'n' });

        // act
        container.bind('n').toConstantValue(0);
        container.bind('s').toConstantValue('a');

        // assert
        container.assertIsFullyBound();
    });

    it('assertIsFullyBound throws if not fully bound', () => {
        // arrange
        const container = new ResettableContainer<{ s: string }>({ s: 's' });

        // act
        let thrown = false;
        try {
            container.assertIsFullyBound();
        }
        catch {
            thrown = true;
        }

        // assert
        assert(thrown);
    });
});