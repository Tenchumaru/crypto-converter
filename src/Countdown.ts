interface Args {
  autoReset?: boolean;
  expirationTime: number;
  tickInterval: number;
  onExpiration: Function;
  onTick: Function;
}

export function countdown({ autoReset = false, expirationTime, tickInterval, onExpiration, onTick }: Args) {
  // Create a countdown timer that invokes onTick every tickInterval and onExpiration upon reaching expirationTime.  Automatically
  // restart the timer if desired or clear it if not.
  const startTime = expirationTime;
  const timerId = setInterval(onInterval, 1000 * tickInterval);

  return () => clearInterval(timerId);

  function onInterval() {
    expirationTime -= tickInterval;
    if (expirationTime <= 0) {
      onExpiration();
      if (autoReset) {
        expirationTime = startTime;
      } else {
        clearInterval(timerId);
      }
    } else {
      onTick();
    }
  }
}
