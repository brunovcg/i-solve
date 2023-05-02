export type SwitchProps = {
  checked?: boolean;
  name?: string;
  onChange: (value: boolean) => void;
  loading?: boolean;
  className?: string;
  leftLabel?: string;
  rightLabel?: string;
  disabled?: boolean;
};
