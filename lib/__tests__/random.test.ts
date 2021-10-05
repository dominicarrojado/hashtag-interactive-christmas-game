import { getFakeNumber } from '../test-helpers';
import { getRandomNumber } from '../random';

describe('random utilities', () => {
  describe('getRandomNumber()', () => {
    it('should return a random number', () => {
      const min = getFakeNumber();
      const max = getFakeNumber({ min: min + 1 });
      const randomNum = getRandomNumber(min, max);

      expect(typeof randomNum).toBe('number');
      expect(randomNum).toBeGreaterThanOrEqual(min);
      expect(randomNum).toBeLessThanOrEqual(max);
    });
  });
});
