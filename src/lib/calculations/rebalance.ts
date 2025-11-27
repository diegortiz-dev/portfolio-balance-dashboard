export function calculateRebalance(current: any, ideal: any) {
  const result = [];

  const total = Object.values(current).reduce((acc: number, v: any) => acc + v, 0);

  for (const assetClass in ideal) {
    const idealValue = (ideal[assetClass] / 100) * total;
    const currentValue = current[assetClass] || 0;

    result.push({
      class: assetClass,
      current: currentValue,
      ideal: idealValue,
      difference: idealValue - currentValue
    });
  }

  return result;
}
