export interface Props {
  currentValue: number;
  maximumValue: number;
}

export function ProgressBar(props: Props) {
  const { currentValue, maximumValue } = props;
  const strokeDasharray = `${100 - 100 * currentValue / maximumValue}px, 100px`;
  const transitionDuration = currentValue === maximumValue ? '0s' : '1s';

  return (
    <svg className="progress-bar" viewBox="0 0 100 2">
      <path className="progress-bar__base" d="M 0.5,1 L 99.5,1" />
      <path className="progress-bar__progress" d="M 0.5,1 L 99.5,1" style={{ strokeDasharray, transitionDuration }} />
    </svg>
  );
}
