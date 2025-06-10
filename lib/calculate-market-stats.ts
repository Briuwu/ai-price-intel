import { ScrapedDataState } from "@/stores/scraped-data-store";

export function calculateMarketStats(products: ScrapedDataState["data"]) {
  const prices = products.map((p) => Number(p.price));

  const count = prices.length;

  if (count === 0) {
    return {
      average_price: 0,
      median_price: 0,
      min_price: 0,
      max_price: 0,
      std_dev: 0,
      mode_price: 0,
      competitor_count: 0,
    };
  }

  prices.sort((a, b) => a - b);

  const sum = prices.reduce((acc, val) => acc + val, 0);
  const average = sum / count;

  const median =
    count % 2 === 0
      ? (prices[count / 2 - 1] + prices[count / 2]) / 2
      : prices[Math.floor(count / 2)];

  const min = prices[0] as number;
  const max = prices[count - 1] as number;

  const mean = average;
  const variance =
    prices.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / count;
  const stdDev = Math.sqrt(variance);

  const frequencyMap: Record<number, number> = {};
  prices.forEach((price) => {
    frequencyMap[price] = (frequencyMap[price] || 0) + 1;
  });

  let mode = prices[0] as number;
  let maxFreq = 1;
  for (const price in frequencyMap) {
    if (frequencyMap[price] > maxFreq) {
      mode = parseFloat(price);
      maxFreq = frequencyMap[price];
    }
  }

  return {
    average_price: Number(average.toFixed(2)),
    median_price: Number(median.toFixed(2)),
    min_price: Number(min.toFixed(2)),
    max_price: Number(max.toFixed(2)),
    std_dev: Number(stdDev.toFixed(2)),
    mode_price: Number(mode.toFixed(2)),
    competitor_count: count,
  };
}
