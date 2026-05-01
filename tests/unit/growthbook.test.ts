import { describe, it, expect } from 'vitest';

describe('GrowthBook SDK', () => {
  it('exports getFeatureValue function', async () => {
    const { getFeatureValue } = await import('../../src/lib/growthbook');
    expect(typeof getFeatureValue).toBe('function');
  });

  it('exports isFeatureOn function', async () => {
    const { isFeatureOn } = await import('../../src/lib/growthbook');
    expect(typeof isFeatureOn).toBe('function');
  });

  it('exports isFeatureOff function', async () => {
    const { isFeatureOff } = await import('../../src/lib/growthbook');
    expect(typeof isFeatureOff).toBe('function');
  });

  it('exports growthbook instance', async () => {
    const { growthbook } = await import('../../src/lib/growthbook');
    expect(growthbook).toBeDefined();
  });

  it('getFeatureValue returns default when flag not set', async () => {
    const { getFeatureValue } = await import('../../src/lib/growthbook');
    const result = getFeatureValue('nonexistent-flag', 'default-value');
    expect(result).toBe('default-value');
  });

  it('isFeatureOn returns false when feature not set', async () => {
    const { isFeatureOn } = await import('../../src/lib/growthbook');
    const result = isFeatureOn('nonexistent-feature');
    expect(result).toBe(false);
  });

  it('isFeatureOff returns true when feature not set', async () => {
    const { isFeatureOff } = await import('../../src/lib/growthbook');
    const result = isFeatureOff('nonexistent-feature');
    expect(result).toBe(true);
  });
});
