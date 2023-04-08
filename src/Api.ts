const fetchKeys: { [key: string]: string } = {
  'BTC': 'bitcoin',
  'ETH': 'ethereum',
};

export async function fetchPrice(cryptoId: string): Promise<number | string> {
  try {
    if (window.location.hash) {
      return Math.random();
    }
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${fetchKeys[cryptoId]}&vs_currencies=usd`;
    const response = await fetch(url);
    const json = await response.json();
    return json[fetchKeys[cryptoId]].usd;
  } catch (err: any) {
    return err.message;
  }
}
