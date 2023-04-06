import { useEffect, useState } from 'react';
import { fetchPrice } from './Api';
import { countdown } from './Countdown';

const delay = window.location.hash ? 4 : 30;
const { format } = Intl.NumberFormat('en-US', { // https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/NumberFormat
  currency: 'USD',
  style: 'currency',
});

export function App() {
  const [result, setResult] = useState<number | string>('Loading...');
  const [ttnu, setTtnu] = useState(delay);
  useEffect(() => countdown({ expirationTime: delay, onTick: updateTtnu, onExpiration: updateConversion, autoReset: true }), []);
  useEffect(() => { updateConversion(); }, []); // https://react.dev/reference/react/useEffect#my-effect-runs-twice-when-the-component-mounts

  return (
    <div className="App">
      <div>{typeof result === 'string' ? result : `ETH is currently worth ${format(result)}.`}</div>
      <div>Time to next update:  {ttnu} second{ttnu === 1 ? '' : 's'}</div>
    </div>
  );

  async function updateConversion() {
    setTtnu(delay);
    setResult(await fetchPrice());
  }

  function updateTtnu() {
    setTtnu(ttnu => ttnu - 1);
  }
}
