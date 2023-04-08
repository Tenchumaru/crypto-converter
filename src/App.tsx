import { useEffect, useState } from 'react';
import { fetchPrice } from './Api';
import { countdown } from './Countdown';
import { ProgressBar } from './ProgressBar';
import './App.css';

const delay = window.location.hash ? 4 : 30;
const { format } = Intl.NumberFormat('en-US', { // https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/NumberFormat
  currency: 'USD',
  style: 'currency',
});
const tickInterval = 1 / 16;

export function App() {
  const [cryptoId, setCryptoId] = useState('ETH');
  const [result, setResult] = useState<number | string>('Loading...');
  const [ttnu, setTtnu] = useState(delay);
  useEffect(() => countdown({ autoReset: true, expirationTime: delay, tickInterval, onExpiration: updateConversion, onTick: updateTtnu }), [cryptoId]);
  useEffect(() => { updateConversion(); }, [cryptoId]); // https://react.dev/reference/react/useEffect#my-effect-runs-twice-when-the-component-mounts

  return (
    <div className="App">
      <div>
        <select value={cryptoId} onChange={handleCryptoIdChange}>
          <option value="BTC">BTC</option>
          <option value="ETH">ETH</option>
        </select>
      </div>
      <div>{typeof result === 'string' ? result : `${cryptoId} is currently worth ${format(result)}.`}</div>
      <div>
        <ProgressBar currentValue={ttnu} tickInterval={tickInterval} maximumValue={delay} />
      </div>
      <div>Time to next update:  {Math.ceil(ttnu)} second{ttnu <= 1 ? '' : 's'}</div>
    </div>
  );

  function handleCryptoIdChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setCryptoId(event.target.value);
  }

  async function updateConversion() {
    setTtnu(delay);
    setResult(await fetchPrice(cryptoId));
  }

  function updateTtnu() {
    setTtnu(ttnu => ttnu - tickInterval);
  }
}
