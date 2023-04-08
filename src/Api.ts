interface Provider {
  extractPrice: (json: any) => number;
  fetchKeys?: { [key: string]: string; };
  urlFormat: string;
}

const providers: Provider[] = [
  {
    extractPrice: (json) => Number(json.data.rates.USD),
    urlFormat: 'https://api.coinbase.com/v2/exchange-rates?currency=$fetchKey',
  },
  {
    extractPrice: (json) => json[Object.keys(json)[0]].usd,
    fetchKeys: {
      'BTC': 'bitcoin',
      'ETH': 'ethereum',
    },
    urlFormat: 'https://api.coingecko.com/api/v3/simple/price?ids=$fetchKey&vs_currencies=usd',
  },
];

export async function fetchPrice(cryptoId: string): Promise<number | string> {
  if (window.location.hash) {
    return Math.random();
  }
  const promises = providers.map((p) => invokeProvider(p, cryptoId));
  for (; ;) {
    const winner = Promise.race(promises);
    const result = await winner;
    if (typeof (result) === 'number' || promises.length === 1) {
      return result;
    }
    promises.splice(promises.indexOf(winner), 1);
  }
}

async function invokeProvider(provider: Provider, cryptoId: string): Promise<number | string> {
  const { extractPrice, fetchKeys, urlFormat } = provider;
  const url = urlFormat.replace('$fetchKey', fetchKeys && fetchKeys[cryptoId] || cryptoId);
  try {
    const response = await fetch(url);
    const json = await response.json();
    return extractPrice(json);
  } catch (err: any) {
    return err.message;
  }
}
