export async function fetchPrice(): Promise<number | string> {
  try {
    if (window.location.hash) {
      return Math.random();
    }
    const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum');
    const json = await response.json();
    return json[0].current_price;
  } catch (err: any) {
    return err.message;
  }
}
