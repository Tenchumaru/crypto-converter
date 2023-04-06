interface Args {
  autoReset?: boolean;
  expirationTime: number;
  onExpiration: Function;
  onTick: Function;
}

export function countdown({ autoReset = false, expirationTime, onExpiration, onTick }: Args) {
  const startTime = expirationTime;
  const timerId = setInterval(onInterval, 1000);

  return () => clearInterval(timerId);

  function onInterval() {
    if (--expirationTime === 0) {
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
