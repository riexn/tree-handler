import { clamp } from '../src/utils';

describe('clamp test', () => {
  it('should clamp to the MIN number when the number is smaller than the clamp range', () => {
    const result = clamp(-10, 0, 100);
    expect(result).toBe(0);
  });

  it('should clamp to the MAX number when the number is bigger than the clamp range', () => {
    const result = clamp(2000, 0, 100);
    expect(result).toBe(100);
  });
});
